package com.example.AssignmentBrief.service;

import com.example.AssignmentBrief.dto.productDTO;
import com.example.AssignmentBrief.mapper.productMapper;
import com.example.AssignmentBrief.model.product;
import com.example.AssignmentBrief.repository.productRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class productService {
    private final productRepository  productRepository;

    public productService(com.example.AssignmentBrief.repository.productRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<productDTO> getAllProducts(){
        List<product> products = productRepository.findAll();

        return products.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<productDTO> getFilteredProducts(
            BigDecimal minPrice, BigDecimal maxPrice,
            BigDecimal minPopularity, BigDecimal maxPopularity) {

        List<product> filtered = productRepository.findAll();

        if(minPrice != null && maxPrice != null){
            filtered = productRepository.findByPriceBetween(minPrice, maxPrice);
        }else if(minPrice != null){
            filtered = filtered.stream()
                    .filter(p -> p.getPrice().compareTo(minPrice) >= 0)
                    .collect(Collectors.toList());
        }else if(maxPrice != null){
            filtered = filtered.stream()
                    .filter(p -> p.getPrice().compareTo(maxPrice) <= 0)
                    .collect(Collectors.toList());
        }

        if(minPopularity != null && maxPopularity != null){
            List<product> popularityFiltered =
                    productRepository
                            .findByPopularityScoreBetween(minPopularity, maxPopularity);
            filtered.retainAll(popularityFiltered);
        }else if (minPopularity != null) {
            filtered = filtered.stream()
                    .filter(p -> p.getPopularityScore().multiply(BigDecimal.valueOf(5)).compareTo(minPopularity) >= 0)
                    .collect(Collectors.toList());
        } else if (maxPopularity != null) {
            filtered = filtered.stream()
                    .filter(p -> p.getPopularityScore().multiply(BigDecimal.valueOf(5)).compareTo(maxPopularity) <= 0)
                    .collect(Collectors.toList());
        }

        return filtered.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }
}
