package com.ay.restaurant.service;

import com.ay.restaurant.dto.ItemDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ItemService {

    public ResponseEntity<String> addNewItem(Map<String,String> requestMap);

    public ResponseEntity<List<ItemDto>> getAllItems();

    public ResponseEntity<String> updateItem(Map<String,String> requestMap);

    public ResponseEntity<String> deleteItem(Integer id);

    public ResponseEntity<List<ItemDto>> getByCategory(Integer id);

}