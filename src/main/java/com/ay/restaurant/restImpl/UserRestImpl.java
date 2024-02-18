package com.ay.restaurant.restImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.rest.UserRest;
import com.ay.restaurant.service.UserService;
import com.ay.restaurant.utils.RestaurantUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<String> signUp(Map<String,String> requestMap) {
        try {
            return userService.signUp(requestMap);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);  // 500
    }
}
