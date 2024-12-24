package com.facugl.banking_system_server.accounts.service;

import java.math.BigDecimal;
import java.util.List;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;

public interface AccountService {

    AccountResponse createAccount(AccountCreateRequest request);

    AccountResponse getAccountById(Long accountId);

    List<AccountResponse> getAllAccounts();

    AccountResponse updateAccount(Long accountId, AccountUpdateRequest request);

    void deleteAccount(Long accountId);

    BigDecimal deposit(Long accountId, BigDecimal amount);

    BigDecimal withdraw(Long accountId, BigDecimal amount);

    void transfer(String accountFromNumber, String accountToNumber, BigDecimal amount);

    BigDecimal getAccountBalance(Long accountId);

}
