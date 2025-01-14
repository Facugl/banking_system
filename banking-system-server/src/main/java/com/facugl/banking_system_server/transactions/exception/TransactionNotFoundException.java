package com.facugl.banking_system_server.transactions.exception;

public class TransactionNotFoundException extends RuntimeException {
    public TransactionNotFoundException(String transactionNumber) {
        super("Transaction with transaction number '" + transactionNumber + "' was not found.");
    }
}
