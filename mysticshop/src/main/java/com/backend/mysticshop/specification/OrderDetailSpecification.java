package com.backend.mysticshop.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.backend.mysticshop.domain.entities.OrderDetails;
import com.backend.mysticshop.domain.enums.OrderStatus;

public class OrderDetailSpecification {
    

    
    /**Specification to filter order items by status*/
    public static Specification<OrderDetails> hasStatus(OrderStatus status){
        return ((root, query, criteriaBuilder) ->
                status != null ? criteriaBuilder.equal(root.get("status"), status) : null);

    }

    /**Specification to filter order items by data range*/
    public static Specification<OrderDetails> createdBetween(LocalDateTime startDate, LocalDateTime endDate){

        return ((root, query, criteriaBuilder) -> 
        {
            if (startDate != null && endDate != null){
                return criteriaBuilder.between(root.get("createdAt"), startDate, endDate);
            } else if (startDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), startDate);
            } else if (endDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), endDate);
            }else{
                return null;
            }
        });
    }

    /** Generate specification to filter orderitems by item id*/
    public static Specification<OrderDetails> hasItemId(Integer itemId){
        return ((root, query , criteriaBuilder) ->
                                     itemId != null ? criteriaBuilder.equal(root.get("orderDetailID") , itemId) : null)  ;
    }

}
