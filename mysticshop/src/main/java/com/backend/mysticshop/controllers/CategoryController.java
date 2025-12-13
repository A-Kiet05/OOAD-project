package com.backend.mysticshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mysticshop.domain.dto.CategoryDTO;
import com.backend.mysticshop.domain.dto.Response;
import com.backend.mysticshop.services.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    
    private final CategoryService categoryService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> create(@RequestBody CategoryDTO categoryDTO){

        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> update(@PathVariable Integer id , @RequestBody CategoryDTO categoryDTO){

        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAll(){

        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Response> getById(@PathVariable Integer id){

        return ResponseEntity.ok(categoryService.getCategoryById(id));
     }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('READER')")
    public ResponseEntity<Response> delete (@PathVariable Integer id){

        return ResponseEntity.ok(categoryService.deleteCategory(id));
     }

}
