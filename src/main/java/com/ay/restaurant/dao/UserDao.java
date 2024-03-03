package com.ay.restaurant.dao;

import com.ay.restaurant.dto.UserDto;
import com.ay.restaurant.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDao extends JpaRepository<User, Integer> {

    User findByEmail(@Param("email") String email);
    List<UserDto> findAllUsers();

}