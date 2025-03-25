package com.facugl.banking_system_server.users.exception;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super("Password don't match.");
    }

}
