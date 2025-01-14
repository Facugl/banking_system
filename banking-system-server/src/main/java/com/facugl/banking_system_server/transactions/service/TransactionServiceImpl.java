package com.facugl.banking_system_server.transactions.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.accounts.persistence.repository.AccountRepository;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.transactions.dto.TransactionMapper;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.exception.TransactionNotFoundException;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;
import com.facugl.banking_system_server.users.persistence.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    private final AuthenticationServiceImpl authenticationService;

    @Override
    @Transactional
    public TransactionResponse createTransaction(Transaction transaction) {
        Transaction savedTransaction = transactionRepository.save(transaction);

        return transactionMapper.toResponse(savedTransaction);
    }

    @Override
    @Transactional(readOnly = true)
    public TransactionResponse getTransaction(String transactionNumber) {
        Transaction transaction = transactionRepository.findByTransactionNumber(transactionNumber)
                .orElseThrow(() -> new TransactionNotFoundException(transactionNumber));

        return transactionMapper.toResponse(transaction);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransactionResponse> getAllTransactions() {
        User currentUser = authenticationService.findLoggedInUser();

        if (currentUser.getRole().getName().equals("CUSTOMER")) {
            List<Account> accounts = accountRepository.findByOwner(currentUser);

            return transactionRepository.findBySourceOrTargetAccounts(accounts)
                    .stream()
                    .map(transactionMapper::toResponse)
                    .collect(Collectors.toList());
        }

        return transactionRepository.findAll()
                .stream()
                .map(transactionMapper::toResponse)
                .collect(Collectors.toList());
    }

}
