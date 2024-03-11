package com.ay.restaurant.dao;

import com.ay.restaurant.dto.ItemDto;
import com.ay.restaurant.pojo.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemDao extends JpaRepository<Item, Integer> {

    List<ItemDto> findAllItems();

}
