package com.ay.restaurant.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ItemService {

    public ResponseEntity<String> addNewItem(Map<String,String> requestMap);

}