package com.facugl.banking_system_server.accounts.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.accounts.dto.AccountMapper;
import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.entity.Account;
import com.facugl.banking_system_server.accounts.exception.AccountAlreadyExistsException;
import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;
import com.facugl.banking_system_server.accounts.repository.AccountRepository;
import com.facugl.banking_system_server.transactions.entity.Transaction;
import com.facugl.banking_system_server.transactions.entity.TransactionType;
import com.facugl.banking_system_server.transactions.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final AccountMapper accountMapper;

    @Override
    @Transactional
    public AccountResponse createAccount(AccountCreateRequest request) {
        if (accountRepository.existsByAccountNumber(request.getAccountNumber())) {
            throw new AccountAlreadyExistsException(request.getAccountNumber());
        }

        Account account = accountMapper.toEntity(request);
        Account savedAccount = accountRepository.save(account);
        return accountMapper.toResponse(savedAccount);
    }

    @Override
    @Transactional(readOnly = true)
    public AccountResponse getAccountById(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        return accountMapper.toResponse(account);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(accountMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AccountResponse updateAccount(Long accountId, AccountUpdateRequest request) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        if (request.getAccountNumber() != null) {
            account.setAccountNumber(request.getAccountNumber());
        }

        if (request.getBalance() != null) {
            account.setBalance(request.getBalance());
        }

        if (request.getType() != null) {
            account.setType(request.getType());
        }

        Account updatedAccount = accountRepository.save(account);
        return accountMapper.toResponse(updatedAccount);
    }

    @Override
    @Transactional
    public void deleteAccount(Long accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new AccountNotFoundException(accountId);
        }

        accountRepository.deleteById(accountId);
    }

    @Override
    @Transactional
    public BigDecimal deposit(Long accountId, BigDecimal amount) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .accountFrom(null)
                .accountTo(account)
                .amount(amount)
                .transactionDate(LocalDateTime.now())
                .type(TransactionType.DEPOSIT)
                .build();

        transactionRepository.save(transaction);

        return account.getBalance();
    }

    @Override
    @Transactional
    public BigDecimal withdraw(Long accountId, BigDecimal amount) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException(account.getAccountNumber(), account.getBalance(), amount);
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .accountFrom(account)
                .accountTo(null)
                .amount(amount)
                .transactionDate(LocalDateTime.now())
                .type(TransactionType.WITHDRAW)
                .build();

        transactionRepository.save(transaction);

        return account.getBalance();
    }

    @Override
    @Transactional
    public void transfer(String accountFromNumber, String accountToNumber, BigDecimal amount) {
        Account accountFrom = accountRepository.findByAccountNumber(accountFromNumber)
                .orElseThrow(() -> new AccountNotFoundException(accountFromNumber));

        Account accountTo = accountRepository.findByAccountNumber(accountToNumber)
                .orElseThrow(() -> new AccountNotFoundException(accountToNumber));

        if (accountFrom.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException(accountFrom.getAccountNumber(), accountFrom.getBalance(), amount);
        }

        accountFrom.setBalance(accountFrom.getBalance().subtract(amount));
        accountTo.setBalance(accountTo.getBalance().add(amount));

        accountRepository.save(accountFrom);
        accountRepository.save(accountTo);

        Transaction transaction = Transaction.builder()
                .accountFrom(accountFrom)
                .accountTo(accountTo)
                .amount(amount)
                .transactionDate(LocalDateTime.now())
                .type(TransactionType.TRANSFER)
                .build();

        transactionRepository.save(transaction);
    }

    @Override
    @Transactional(readOnly = true)
    public BigDecimal getAccountBalance(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        return account.getBalance();
    }

}
