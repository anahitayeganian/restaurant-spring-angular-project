package com.ay.restaurant.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtils {

    private String secretKey = "c10dc3a329f95a6758774b366308bd6e33ede12c47f5c097bc294f34834b1e2";

    /* This method takes a JWT string token as input and extracts the subject claim from it.
    * The subject claim typically represents the identity of the user associated with the token.
    * The claimsResolver function is used to resolve the extracted claims into a specific type T. It extracts all claims
    * from the JWT token and applies the claimsResolver function to retrieve a specific claim. In this case, it's used
    * to extract the subject claim, which represents the username */
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    /* This is a generic method that takes two parameters, a JWT string token and a Function object claimsResolver.
    * It first calls extractAllClaims(token) to obtain the claims as a Claims object. Then, it applies the claimsResolver function
    * to the Claims object using the apply() method, which converts the Claims object into the desired type T */
    public <T> T extractClaims(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /* This method takes a JWT string token as input, extracts the claims and returns them as a Claims object.
    * It uses the Jwts class to parse the token, verifies its signature using a secret key (secretKey) and then extracts the claims */
    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); // Represents the time at which it was allocated
    }

    public String generateToken(String username, String role) {
        Map<String,Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, username);
    }

    private String createToken(Map<String,Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)    // Username
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5))   // Expires in 5 hours
                .signWith(SignatureAlgorithm.HS256, secretKey)  // To pass the signature
                .compact();
    }

    /* The UserDetails interface defines the contract for user information required by the Spring Security framework during the
    * authentication process. It encapsulates essential user details such as username, password, roles, and whether the user's
    * account is enabled or not */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
