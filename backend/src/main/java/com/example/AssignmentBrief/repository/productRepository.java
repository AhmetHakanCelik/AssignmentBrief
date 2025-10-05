package com.example.AssignmentBrief.repository;

import com.example.AssignmentBrief.model.product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface productRepository extends JpaRepository<product,String> {

    List<product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<product> findByPopularityScoreBetween(BigDecimal minPopularity, BigDecimal maxPopularity);

}
