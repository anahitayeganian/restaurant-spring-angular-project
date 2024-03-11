package com.ay.restaurant.restImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.rest.ItemRest;
import com.ay.restaurant.service.ItemService;
import com.ay.restaurant.utils.RestaurantUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
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

}
