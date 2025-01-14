package com.facugl.banking_system_server.users.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super("User with username '" + username + "' was not found.");
    }
}
