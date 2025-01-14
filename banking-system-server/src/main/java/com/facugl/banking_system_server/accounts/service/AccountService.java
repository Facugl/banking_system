package com.facugl.banking_system_server.accounts.service;

import java.math.BigDecimal;
import java.util.List;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountStatusRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.TransferRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;

public interface AccountService {

    AccountResponse createAccount(AccountCreateRequest request);

    AccountResponse getAccountByAccountNumber(String accountNumber);

    List<AccountResponse> getAccountsForCurrentUser();

    AccountResponse updateAccount(String accountNumber, AccountUpdateRequest request);

    AccountResponse updateAccountStatus(String accountNumber, AccountStatusRequest request);

    void deleteAccount(String accountNumber);

    TransactionResponse deposit(String accountNumber, AccountOperationRequest request);

    TransactionResponse withdraw(String accountNumber, AccountOperationRequest request);

    TransactionResponse transfer(String sourceAccountNumber, TransferRequest request);

    BigDecimal getAccountBalance(String accountNumber);

}
