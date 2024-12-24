package com.facugl.banking_system_server.accounts.exception;

import java.math.BigDecimal;

public class InsufficientBalanceException extends RuntimeException {

    public InsufficientBalanceException(String accountNumber, BigDecimal currentBalance, BigDecimal withdrawalAmount) {
        super("Insufficient balance in account " + accountNumber + ". Current balance: " + currentBalance
                + ", attempted withdrawal: " + withdrawalAmount);
    }

}
