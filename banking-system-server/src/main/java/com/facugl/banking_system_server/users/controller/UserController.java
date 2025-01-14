package com.facugl.banking_system_server.users.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.users.dto.request.CustomerRequest;
import com.facugl.banking_system_server.users.dto.response.UserResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final AuthenticationServiceImpl authenticationService;

    @PostMapping
    public ResponseEntity<UserResponse> registerCustomer(@Valid @RequestBody CustomerRequest request) {
        UserResponse registeredCustomer = authenticationService.registerCustomer(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(registeredCustomer);
    }

}
