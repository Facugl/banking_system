package com.facugl.banking_system_server.transactions.service;

import java.util.List;

import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.entity.Transaction;

public interface TransactionService {

    TransactionResponse createTransaction(Transaction transaction);

    List<TransactionResponse> getAllTransactions();

}
