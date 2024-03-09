package com.ay.restaurant.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CategoryService {

    public ResponseEntity<String> addNewCategory(Map<String,String> requestMap);

}
