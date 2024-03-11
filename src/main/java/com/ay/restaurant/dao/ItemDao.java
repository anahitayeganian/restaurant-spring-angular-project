package com.ay.restaurant.dao;

import com.ay.restaurant.pojo.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDao extends JpaRepository<Item, Integer> {
}
