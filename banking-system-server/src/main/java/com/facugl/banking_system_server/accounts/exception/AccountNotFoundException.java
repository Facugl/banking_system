package com.facugl.banking_system_server.accounts.exception;

public class AccountNotFoundException extends RuntimeException {

    public AccountNotFoundException(String accountNumber) {
        super("Account with account number '" + accountNumber + "' was not found.");
    }

}
