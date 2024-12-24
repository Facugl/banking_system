package com.facugl.banking_system_server.accounts.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AmountRequest;
import com.facugl.banking_system_server.accounts.dto.request.TransferRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.service.AccountServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
@RestController
public class AccountController {

    private final AccountServiceImpl accountService;

    @PostMapping()
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountCreateRequest request) {
        AccountResponse savedAccount = accountService.createAccount(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
    }

    @GetMapping("/{account-id}")
    public ResponseEntity<AccountResponse> getAccountById(@PathVariable(name = "account-id") Long accountId) {
        AccountResponse account = accountService.getAccountById(accountId);

        return ResponseEntity.status(HttpStatus.OK).body(account);
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        List<AccountResponse> accounts = accountService.getAllAccounts();

        if (accounts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(accounts);
    }

    @PutMapping("/{account-id}")
    public ResponseEntity<AccountResponse> updateAccount(
            @PathVariable(name = "account-id") Long accountId,
            @Valid @RequestBody AccountUpdateRequest request) {
        AccountResponse account = accountService.updateAccount(accountId, request);

        return ResponseEntity.status(HttpStatus.OK).body(account);
    }

    @DeleteMapping("/{account-id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable(name = "account-id") Long accountId) {
        accountService.deleteAccount(accountId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{account-id}/deposit")
    public ResponseEntity<BigDecimal> deposit(
            @PathVariable(name = "account-id") Long accountId,
            @Valid @RequestBody AmountRequest amount) {
        BigDecimal newBalance = accountService.deposit(accountId, amount.getAmount());

        return ResponseEntity.status(HttpStatus.OK).body(newBalance);
    }

    @PostMapping("/{account-id}/withdraw")
    public ResponseEntity<BigDecimal> withdraw(
            @PathVariable(name = "account-id") Long accountId,
            @Valid @RequestBody AmountRequest amount) {
        BigDecimal newBalance = accountService.withdraw(accountId, amount.getAmount());

        return ResponseEntity.status(HttpStatus.OK).body(newBalance);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@Valid @RequestBody TransferRequest transfer) {
        accountService.transfer(
                transfer.getSourceAccountNumber(),
                transfer.getTargetAccountNumber(),
                transfer.getAmount());

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{account-id}/balance")
    public ResponseEntity<BigDecimal> getAccountBalance(@PathVariable(name = "account-id") Long accountId) {
        BigDecimal balance = accountService.getAccountBalance(accountId);
        return ResponseEntity.status(HttpStatus.OK).body(balance);
    }

}
