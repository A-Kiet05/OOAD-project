package com.backend.mysticshop.services.servicesimple;


import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.mysticshop.domain.dto.CloudinaryResponse;
import com.backend.mysticshop.domain.dto.ProductDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.domain.entities.Product;
import com.backend.mysticshop.exception.NotFoundException;
import com.backend.mysticshop.mappers.Mapper;
import com.backend.mysticshop.mappers.imple.ProductMapperImple;
import com.backend.mysticshop.repositories.ProductRepository;
import com.backend.mysticshop.services.CloudinaryService;
import com.backend.mysticshop.services.ProductService;
import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService{
    
    private final ProductRepository productRepository;
    private final Mapper<Product, ProductDTO> productMapper;
    // private final AwsS3Service awsS3Service;
    private final CloudinaryService cloudinaryService;
    
    @Override
    public Response createProduct(MultipartFile image , String name , String description , BigDecimal price , Integer stockQuantity){
         
         CloudinaryResponse cloudinaryResponse = null;

        if (image != null && !image.isEmpty()) {
        cloudinaryResponse = cloudinaryService.uploadFile(
                image,
                "product_" + name.replace(" ", "_"),
                "products"
        );
      }
        
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
       
        if (cloudinaryResponse != null) {
        product.setImageUrl(cloudinaryResponse.getUrl());
      }

       productRepository.save(product);


        return Response.builder()
                       .status(200)
                       .message("Product Added Successfully!")
                       .build();



    }

    @Override
    public Response updateProduct(Integer productID , MultipartFile image , String name , String description , BigDecimal price , Integer stockQuantity){
          
        Product product = productRepository.findById(productID).orElseThrow(() -> new NotFoundException("Not Found Product!"));
        
        if (image != null && !image.isEmpty()) {

        CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadFile(
                image,
                "product_" + productID,
                "products"
        );

        product.setImageUrl(cloudinaryResponse.getUrl());
      }

        if(name != null) product.setName(name);
        if(description != null) product.setDescription(description);
        if(price != null) product.setPrice(price);
        if(stockQuantity != null) product.setStockQuantity(stockQuantity);

        productRepository.save(product);


        return Response.builder()
                       .status(200)
                       .message("Updated Successfully!")
                       .build();
    }
    
    @Override
    public Response deleteProduct(Integer productID){
           
        Product product = productRepository.findById(productID).orElseThrow(() -> new NotFoundException("Not Found Product!"));
        productRepository.delete(product);

        return Response.builder()
                       .status(200)
                       .message("Delete!")
                       .build();
    }
    
    @Override
    public  Response findProductById(Integer productID){
            
         Product product = productRepository.findById(productID).orElseThrow(() -> new NotFoundException("Not Found Product!"));

         ProductDTO productDTO = productMapper.mapTo(product);

         return Response.builder()
                        .status(200)
                        .product(productDTO)
                        .build();
    }


    @Override
    public Response getAllProducts(){
           List<ProductDTO> productsList = productRepository.findAll(Sort.by(Sort.Direction.DESC , "productID"))
           .stream().map(productMapper::mapTo).collect(Collectors.toList());

           return Response.builder()
                          .status(200)
                          .productList(productsList)
                          .build();

    }


    @Override
    public Response searchProduct(String searchValue){
           
        List<Product> productSearchValue = productRepository.findByNameContainingOrDescriptionContaining(searchValue , searchValue);
        if(productSearchValue == null || productSearchValue.isEmpty()){
            throw new NotFoundException("Not Found The Desired Product!");
        }

        List<ProductDTO> productDTOs = productSearchValue
                                       .stream().map(productMapper::mapTo).collect(Collectors.toList());

           return Response.builder()
                          .status(200)
                          .productList(productDTOs)
                          .build();
    }



}
