package com.facugl.banking_system_server.auth.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.facugl.banking_system_server.auth.dto.request.AuthenticationRequest;
import com.facugl.banking_system_server.auth.dto.response.AuthenticationResponse;
import com.facugl.banking_system_server.auth.persistence.entity.JwtToken;
import com.facugl.banking_system_server.auth.persistence.repository.JwtTokenRepository;
import com.facugl.banking_system_server.auth.service.AuthenticationService;
import com.facugl.banking_system_server.users.dto.request.CustomerRequest;
import com.facugl.banking_system_server.users.dto.response.UserResponse;
import com.facugl.banking_system_server.users.exception.UserNotFoundException;
import com.facugl.banking_system_server.users.persistence.entity.User;
import com.facugl.banking_system_server.users.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;
    private final JwtServiceImpl jwtService;
    private final JwtTokenRepository jwtTokenRepository;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public UserResponse registerCustomer(CustomerRequest request) {
        User user = userService.registerCustomer(request);

        String jwt = jwtService.generateToken(user, generateExtraclaims(user));
        saveUserToken(user, jwt);

        UserResponse registeredCustomer = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .role(user.getRole().getName())
                .build();

        registeredCustomer.setJwt(jwt);

        return registeredCustomer;
    }

    @Override
    @Transactional
    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword());

        authenticationManager.authenticate(authentication);

        UserDetails user = userService.findByUsername(request.getUsername()).get();

        String jwt = jwtService.generateToken(user, generateExtraclaims((User) user));
        saveUserToken((User) user, jwt);

        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .jwt(jwt)
                .build();

        return authenticationResponse;
    }

    @Override
    public boolean validateToken(String jwt) {
        try {
            jwtService.extractUsername(jwt);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User findLoggedInUser() {
        Authentication auth = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext()
                .getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new AccessDeniedException("No authenticated user found.");
        }

        String username = (String) auth.getPrincipal();

        return userService.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
    }

    @Override
    @Transactional
    public void logout(HttpServletRequest request) {
        String jwt = jwtService.extractJwtFromRequest(request);

        if (jwt == null || !StringUtils.hasText(jwt))
            return;

        Optional<JwtToken> token = jwtTokenRepository.findByToken(jwt);

        if (token.isPresent() && token.get().isValid()) {
            token.get().setValid(false);

            jwtTokenRepository.save(token.get());
        }
    }

    private Map<String, Object> generateExtraclaims(User user) {
        Map<String, Object> extraClaims = new HashMap<>();

        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole().getName());
        extraClaims.put("authorities", user.getAuthorities());

        return extraClaims;
    }

    private void saveUserToken(User user, String jwt) {
        JwtToken token = JwtToken.builder()
                .token(jwt)
                .user(user)
                .expiration(jwtService.extractExpiration(jwt))
                .isValid(true)
                .build();

        jwtTokenRepository.save(token);
    }

}
