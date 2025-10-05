package com.example.AssignmentBrief.controller;

import com.example.AssignmentBrief.dto.productDTO;
import com.example.AssignmentBrief.service.productService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/v1/product")
@Validated
public class productController {
    private final productService productService;

    public productController(productService service) {
        this.productService = service;
    }

    @GetMapping("/list")
    public ResponseEntity<List<productDTO>> getAllProducts() {
        List<productDTO> productDTOList = productService.getAllProducts();
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<productDTO>> getAllProductsByFilter(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minPopularity,
            @RequestParam(required = false) BigDecimal maxPopularity
    ) {
        List<productDTO> filteredList = productService.getFilteredProducts(minPrice, maxPrice, minPopularity,maxPopularity);
        return ResponseEntity.ok(filteredList);
    }
}
