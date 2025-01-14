package com.facugl.banking_system_server.auth.service;

import com.facugl.banking_system_server.auth.dto.request.AuthenticationRequest;
import com.facugl.banking_system_server.auth.dto.response.AuthenticationResponse;
import com.facugl.banking_system_server.users.dto.request.CustomerRequest;
import com.facugl.banking_system_server.users.dto.response.UserResponse;
import com.facugl.banking_system_server.users.persistence.entity.User;

public interface AuthenticationService {

    UserResponse registerCustomer(CustomerRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    boolean validateToken(String jwt);

    User findLoggedInUser();

}
