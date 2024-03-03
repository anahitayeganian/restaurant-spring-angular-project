package com.ay.restaurant.serviceImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.dao.UserDao;
import com.ay.restaurant.dto.UserDto;
import com.ay.restaurant.jwt.CustomUserDetailsService;
import com.ay.restaurant.jwt.JwtFilter;
import com.ay.restaurant.jwt.JwtUtils;
import com.ay.restaurant.pojo.User;
import com.ay.restaurant.service.UserService;
import com.ay.restaurant.utils.RestaurantUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtils jwtUtils;
    private final JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> signUp(Map<String,String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if(validateSignUpMap(requestMap)) {
                User user = userDao.findByEmail(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFromMap(requestMap));
                    return RestaurantUtils.getResponseEntity("Successfully registered", HttpStatus.OK); // 200
                } else
                    /* There is no need to create a new user */
                    return RestaurantUtils.getResponseEntity("Email already exists", HttpStatus.BAD_REQUEST); // 400
            } else
                return RestaurantUtils.getResponseEntity(RestaurantConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String,String> requestMap) {
        if(requestMap.containsKey("name") && requestMap.containsKey("contactNumber") && requestMap.containsKey("email") && requestMap.containsKey("password"))
            return true;
        else
            return false;
    }

    private User getUserFromMap(Map<String,String> requestMap) {
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setStatus("false");
        user.setRole("user");
        return user;
    }

    /* If the authentication is successful it checks if the user's status is active. If the status is true, it generates a JWT token and returns
     * it along with an HTTP status code of 200, if the user's status is not true it returns a message indicating that the user needs to wait for
     * admin approval along with an HTTP status code of 400.
     * If the authentication fails (due to incorrect credentials or other reasons), it catches the exception and logs it. Then, it returns a message
     * indicating bad credentials along with an HTTP status code of 400 (Bad Request) */
    @Override
    public ResponseEntity<String> login(Map<String,String> requestMap) {
        log.info("Inside login");
        try {
            /* It attempts to authenticate the user by using the provided email and password through the authenticationManager.authenticate() method which uses Spring Security's authentication mechanisms */
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));
            if(authentication.isAuthenticated()) {
                if(customUserDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true"))
                    return new ResponseEntity<String>("{\"token\":\"" + jwtUtils.generateToken(customUserDetailsService.getUserDetail().getEmail(),
                            customUserDetailsService.getUserDetail().getRole()) + "\"}", HttpStatus.OK);
                else
                    return new ResponseEntity<String>("{\"message\":\"" + "Wait for admin approval" + "\"}", HttpStatus.BAD_REQUEST);
            }
        } catch(Exception exception) {
            log.info("{}", exception);
        }
        return new ResponseEntity<String>("{\"message\":\"" + "Bad credentials" + "\"}", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            if(jwtFilter.isAdmin())
                return new ResponseEntity<List<UserDto>>(userDao.findAllUsers(), HttpStatus.OK);
            else
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<List<UserDto>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}