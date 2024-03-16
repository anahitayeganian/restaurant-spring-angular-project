package com.ay.restaurant.rest;

import com.ay.restaurant.pojo.Bill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/bills")
public interface BillRest {

    @PostMapping(path = "/report")
    public ResponseEntity<String> generateReport(@RequestBody(required = true) Map<String,Object> requestMap);

    @GetMapping(path = "/all")
    ResponseEntity<List<Bill>> getBills();

}
