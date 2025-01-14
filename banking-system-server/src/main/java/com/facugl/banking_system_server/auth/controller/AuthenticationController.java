package com.facugl.banking_system_server.auth.controller;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.auth.dto.request.AuthenticationRequest;
import com.facugl.banking_system_server.auth.dto.response.AuthenticationResponse;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.users.dto.response.LoggedInUserResponse;
import com.facugl.banking_system_server.users.persistence.entity.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final AuthenticationServiceImpl authenticationService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.login(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // método de utilería
    @GetMapping("/validate-token")
    public ResponseEntity<Boolean> validate(@RequestParam String jwt) {
        boolean isTokenValid = authenticationService.validateToken(jwt);

        return ResponseEntity.status(HttpStatus.OK).body(isTokenValid);
    }

    @GetMapping("/profile")
    public ResponseEntity<LoggedInUserResponse> findMyProfile() {
        User user = authenticationService.findLoggedInUser();

        LoggedInUserResponse loggedInUser = LoggedInUserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .role(user.getRole().getName())
                .authorities(user.getAuthorities()
                        .stream()
                        .map(authority -> authority.getAuthority())
                        .collect(Collectors.toList()))
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(loggedInUser);
    }

}
