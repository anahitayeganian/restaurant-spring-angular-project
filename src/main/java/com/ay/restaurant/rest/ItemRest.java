package com.ay.restaurant.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/item")
public interface ItemRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewItem(@RequestBody(required = true) Map<String,String> requestMap);

}
