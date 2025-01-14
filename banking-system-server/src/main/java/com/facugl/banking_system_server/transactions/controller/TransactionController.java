package com.facugl.banking_system_server.transactions.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/transactions")
@RestController
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/{transaction-number}")
    public ResponseEntity<TransactionResponse> getTransaction(
            @PathVariable(name = "transaction-number") String transactionNumber) {
        TransactionResponse transaction = transactionService.getTransaction(transactionNumber);

        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAllTransactions() {
        List<TransactionResponse> transactions = transactionService.getAllTransactions();

        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

}
