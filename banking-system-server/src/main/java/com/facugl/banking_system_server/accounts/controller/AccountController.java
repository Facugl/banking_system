package com.facugl.banking_system_server.accounts.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountStatusRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.TransferRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.service.AccountServiceImpl;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/accounts")
@RestController
public class AccountController {

    private final AccountServiceImpl accountService;

    @PostMapping()
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountCreateRequest request) {
        AccountResponse savedAccount = accountService.createAccount(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
    }

    @GetMapping("/{account-number}")
    public ResponseEntity<AccountResponse> getAccount(@PathVariable(name = "account-number") String accountNumber) {
        AccountResponse account = accountService.getAccountByAccountNumber(accountNumber);

        return ResponseEntity.status(HttpStatus.OK).body(account);
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        List<AccountResponse> accounts = accountService.getAccountsForCurrentUser();

        if (accounts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(accounts);
    }

    @PutMapping("/{account-number}")
    public ResponseEntity<AccountResponse> updateAccount(
            @PathVariable(name = "account-number") String accountNumber,
            @Valid @RequestBody AccountUpdateRequest request) {
        AccountResponse account = accountService.updateAccount(accountNumber, request);

        return ResponseEntity.status(HttpStatus.OK).body(account);
    }

    @PatchMapping("/{account-number}/change-status")
    public ResponseEntity<AccountResponse> updateAccountStatus(
            @PathVariable(name = "account-number") String accountNumber,
            @Valid @RequestBody AccountStatusRequest request) {
        AccountResponse account = accountService.updateAccountStatus(accountNumber, request);

        return ResponseEntity.status(HttpStatus.OK).body(account);
    }

    @DeleteMapping("/{account-number}")
    public ResponseEntity<Void> deleteAccount(@PathVariable(name = "account-number") String accountNumber) {
        accountService.deleteAccount(accountNumber);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{account-number}/deposit")
    public ResponseEntity<TransactionResponse> deposit(
            @PathVariable(name = "account-number") String accountNumber,
            @Valid @RequestBody AccountOperationRequest request) {
        TransactionResponse transaction = accountService.deposit(accountNumber, request);

        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @PostMapping("/{account-number}/withdraw")
    public ResponseEntity<TransactionResponse> withdraw(
            @PathVariable(name = "account-number") String accountNumber,
            @Valid @RequestBody AccountOperationRequest request) {
        TransactionResponse transaction = accountService.withdraw(accountNumber, request);

        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @PostMapping("/{source-account-number}/transfer")
    public ResponseEntity<TransactionResponse> transfer(
            @PathVariable(name = "source-account-number") String sourceAccountNumber,
            @Valid @RequestBody TransferRequest request) {
        TransactionResponse transaction = accountService.transfer(sourceAccountNumber, request);

        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @GetMapping("/{account-number}/balance")
    public ResponseEntity<BigDecimal> getAccountBalance(
            @PathVariable(name = "account-number") String accountNumber) {
        BigDecimal balance = accountService.getAccountBalance(accountNumber);

        return ResponseEntity.status(HttpStatus.OK).body(balance);
    }

}
