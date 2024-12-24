package com.facugl.banking_system_server.accounts.exception;

public class AccountAlreadyExistsException extends RuntimeException {

    public AccountAlreadyExistsException(String accountNumber) {
        super("Account with account number '" + accountNumber + "' already exists.");
    }

}
