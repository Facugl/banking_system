package com.facugl.banking_system_server.users.service;

import java.util.Optional;

import com.facugl.banking_system_server.users.dto.request.CustomerRequest;
import com.facugl.banking_system_server.users.persistence.entity.User;

public interface UserService {

    User registerCustomer(CustomerRequest request);

    Optional<User> findByUsername(String username);

}
