package com.ay.restaurant.serviceImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.dao.CategoryDao;
import com.ay.restaurant.dao.ItemDao;
import com.ay.restaurant.dto.ItemDto;
import com.ay.restaurant.dto.UserDto;
import com.ay.restaurant.jwt.JwtFilter;
import com.ay.restaurant.pojo.Category;
import com.ay.restaurant.pojo.Item;
import com.ay.restaurant.service.ItemService;
import com.ay.restaurant.utils.RestaurantUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final JwtFilter jwtFilter;
    private final ItemDao itemDao;
    private final CategoryDao categoryDao;

    @Override
    public ResponseEntity<String> addNewItem(Map<String,String> requestMap) {
        try {
            if(jwtFilter.isAdmin()) {
                if(validateItemMap(requestMap, false)) {
                    Item newItem = getItemFromMap(requestMap, new Item());
                    newItem.setStatus("true");
                    itemDao.save(newItem);
                    return RestaurantUtils.getResponseEntity("Item added successfully", HttpStatus.OK);
                }
                else
                    return RestaurantUtils.getResponseEntity(RestaurantConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
            else
                return RestaurantUtils.getResponseEntity(RestaurantConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateItemMap(Map<String,String> requestMap, boolean validateId) {
        if(requestMap.containsKey("name") && requestMap.containsKey("price") && requestMap.containsKey("categoryId")) {
            if((requestMap.containsKey("itemId") && validateId) || !validateId)
                return true;
        }
        return false;
    }

    private Item getItemFromMap(Map<String,String> requestMap, Item item) {
        Optional<Category> optionalCategory = categoryDao.findById(Integer.parseInt(requestMap.get("categoryId")));
        item.setName(requestMap.get("name"));
        item.setDescription(requestMap.get("description"));
        item.setPrice(Integer.parseInt(requestMap.get("price")));
        if(!optionalCategory.isEmpty()) {
            item.setCategory(optionalCategory.get());
        }
        return item;
    }

    @Override
    public ResponseEntity<List<ItemDto>> getAllItems() {
        try {
            return new ResponseEntity<>(itemDao.findAllItems(), HttpStatus.OK);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
