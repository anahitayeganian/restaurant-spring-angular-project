package com.ay.restaurant.restImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.rest.BillRest;
import com.ay.restaurant.service.BillService;
import com.ay.restaurant.utils.RestaurantUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BillRestImpl implements BillRest {

    private final BillService billService;

    @Override
    public ResponseEntity<String> generateReport(Map<String,Object> requestMap) {
        try {
            return billService.generateReport(requestMap);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
