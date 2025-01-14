package com.facugl.banking_system_server.users.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.facugl.banking_system_server.roles.exceptions.RoleNotFoundException;
import com.facugl.banking_system_server.roles.persistence.entity.Role;
import com.facugl.banking_system_server.roles.service.RoleService;
import com.facugl.banking_system_server.users.dto.request.CustomerRequest;
import com.facugl.banking_system_server.users.exception.InvalidPasswordException;
import com.facugl.banking_system_server.users.persistence.entity.User;
import com.facugl.banking_system_server.users.persistence.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    @Override
    public User registerCustomer(CustomerRequest request) {
        validatePassword(request);

        Role defaultRole = roleService.findDefaultRole()
                .orElseThrow(() -> new RoleNotFoundException());

        User user = User.builder()
                .username(request.getUsername())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(defaultRole)
                .build();

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private void validatePassword(CustomerRequest request) {
        if (!StringUtils.hasText(request.getPassword()) || !StringUtils.hasText(request.getRepeatedPassword())) {
            throw new InvalidPasswordException("Password don't match");
        }

        if (!request.getPassword().equals(request.getRepeatedPassword())) {
            throw new InvalidPasswordException("Password don't match");
        }
    }

}
