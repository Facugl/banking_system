package com.facugl.banking_system_server.transactions.service;

import java.util.List;

import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;

public interface TransactionService {

    TransactionResponse createTransaction(Transaction transaction);

    TransactionResponse getTransaction(String transactionNumber);

    List<TransactionResponse> getAllTransactions();

}
