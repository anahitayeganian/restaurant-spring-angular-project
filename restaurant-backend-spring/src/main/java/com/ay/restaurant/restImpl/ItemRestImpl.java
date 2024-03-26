package com.ay.restaurant.restImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.dto.ItemDto;
import com.ay.restaurant.rest.ItemRest;
import com.ay.restaurant.service.ItemService;
import com.ay.restaurant.utils.RestaurantUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ItemRestImpl implements ItemRest {

    private final ItemService itemService;

    @Override
    public ResponseEntity<String> addNewItem(Map<String,String> requestMap) {
        try {
            return itemService.addNewItem(requestMap);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ItemDto>> getAllItems() {
        try {
            return itemService.getAllItems();
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateItem(Map<String,String> requestMap) {
        try {
            return itemService.updateItem(requestMap);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteItem(Integer id) {
        try {
            return itemService.deleteItem(id);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ItemDto>> getByCategory(Integer id) {
        try {
            return itemService.getByCategory(id);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ItemDto> getItem(Integer id) {
        try {
            return itemService.getItem(id);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ItemDto(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
