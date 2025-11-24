package com.backend.mysticshop.services.servicesimple;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.backend.mysticshop.domain.dto.OrderDetailsDTO;
import com.backend.mysticshop.domain.dto.OrderRequest;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Order;
import com.backend.mysticshop.domain.entities.OrderDetails;
import com.backend.mysticshop.domain.entities.Product;
import com.backend.mysticshop.domain.entities.User;
import com.backend.mysticshop.domain.enums.OrderStatus;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.repositories.OrderDetailRepository;
import com.backend.mysticshop.repositories.OrderRepository;
import com.backend.mysticshop.repositories.ProductRepository;
import com.backend.mysticshop.services.OrderDetailsService;
import com.backend.mysticshop.services.UserService;
import com.backend.mysticshop.specification.OrderDetailSpecification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
@RequiredArgsConstructor
public class OrderDetailServiceImple implements OrderDetailsService{

    private final OrderDetailRepository orderDetailRepository;
    private final Mapper<OrderDetails, OrderDetailsDTO> orderDetailMapper;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;
    
    @Override
    public Response placeOrder(OrderRequest orderRequest){
              
            User user = userService.getLogin();
        //map order request items to order entities

       List<OrderDetails> orderDetails = orderRequest.getOrderDetailsRequests().stream().map(orderDetailRequest -> {
             Product product = productRepository.findById(orderDetailRequest.getProductID())
             .orElseThrow(()-> new NotFoundException("Product Not Found"));

             OrderDetails orderDetail = new OrderDetails();
             orderDetail.setProduct(product);
             orderDetail.setQuantity(orderDetailRequest.getQuantity());
             orderDetail.setPriceAtPurchase(product.getPrice().multiply(BigDecimal.valueOf(orderDetailRequest.getQuantity())));
             orderDetail.setStatus(OrderStatus.PENDING);
             orderDetail.setUser(user);

             return orderDetail;

       }).collect(Collectors.toList());

        //calculate the total price
        BigDecimal totalPrice = orderRequest.getTotalAmount() != null && orderRequest.getTotalAmount().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalAmount()
                : orderDetails.stream().map(OrderDetails::getPriceAtPurchase).reduce(BigDecimal.ZERO , BigDecimal::add);

        //create order entity
        Order order = new Order();
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(totalPrice);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setUser(user);

        //set the order reference in each orderitem
        orderDetails.forEach(orderDetail -> orderDetail.setOrder(order));

        orderRepository.save(order);

        return Response.builder()
                .status(200)
                .message("Order was successfully placed")
                .build();

    }

    @Override
    public Response updateOrderDetailStatus (Integer orderDetailsId , String status){
            
          OrderDetails orderDetail = orderDetailRepository.findById(orderDetailsId)
                .orElseThrow(()-> new NotFoundException("Order Item not found"));

        orderDetail.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderDetailRepository.save(orderDetail);
        return Response.builder()
                .status(200)
                .message("Order status updated successfully")
                .build();
    }


    @Override
    public Response filterOrderDetails(OrderStatus status ,LocalDateTime startDate , LocalDateTime endDate , Integer itemId , Pageable pageable ){
             
        Specification<OrderDetails> spec = Specification.where(OrderDetailSpecification.hasStatus(status))
                .and(OrderDetailSpecification.createdBetween(startDate, endDate))
                .and(OrderDetailSpecification.hasItemId(itemId));

        Page<OrderDetails> orderDetailsPage = orderDetailRepository.findAll(spec, pageable);

        if (orderDetailsPage.isEmpty()){
            throw new NotFoundException("No Order Found");
        }
        List<OrderDetailsDTO> orderDetailDtos = orderDetailsPage.getContent().stream()
                .map(orderDetailMapper::mapTo)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .orderDetailList(orderDetailDtos)
                .totalPages(orderDetailsPage.getTotalPages())
                .totalElement(orderDetailsPage.getTotalElements())
                .build();
    }
    
}
