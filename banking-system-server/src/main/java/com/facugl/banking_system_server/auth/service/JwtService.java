package com.facugl.banking_system_server.auth.service;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String generateToken(UserDetails user, Map<String, Object> extraClaims);

    String extractUsername(String jwt);

}
