package com.facugl.banking_system_server.accounts.service;

import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;
import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.accounts.persistence.repository.AccountRepository;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.common.utils.IdentifierGenerator;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;
import com.facugl.banking_system_server.transactions.service.TransactionServiceImpl;
import com.facugl.banking_system_server.users.persistence.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {

  @Mock
  private AccountRepository accountRepository;

  @Mock
  private TransactionRepository transactionRepository;

  @Mock
  private TransactionServiceImpl transactionService;

  @Mock
  private AuthenticationServiceImpl authenticationService;

  @Mock
  private IdentifierGenerator identifierGenerator;

  @InjectMocks
  private AccountServiceImpl accountService;

  private Account account;
  private Account targetAccount;
  private AccountOperationRequest request;
  private User user;

  @BeforeEach
  void setUp() {
    user = new User();
    user.setUsername("naruto");

    Role role = new Role();
    role.setName("CUSTOMER");
    user.setRole(role);

    account = new Account();
    account.setAccountNumber("112233445501");
    account.setBalance(BigDecimal.valueOf(1000));
    account.setOwner(user);

    targetAccount = new Account();
    targetAccount.setAccountNumber("778899001167");
    targetAccount.setBalance(BigDecimal.valueOf(500));

    request = new AccountOperationRequest();
    request.setAmount(BigDecimal.valueOf(200));
    request.setComment("ATM withdrawal");
  }

  @Test
  void withdraw_shouldSubtractBalanceAndCreateTransaction() {
    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(authenticationService.findLoggedInUser())
        .thenReturn(user);

    when(identifierGenerator.generateUniqueIdentifier(any()))
        .thenReturn("200000000001");

    TransactionResponse transactionResponse = new TransactionResponse();
    when(transactionService.createTransaction(any()))
        .thenReturn(transactionResponse);

    TransactionResponse result = accountService.withdraw("112233445501", request);

    assertEquals(BigDecimal.valueOf(800), account.getBalance());
    assertNotNull(result);

    verify(accountRepository).save(account);
    verify(transactionService).createTransaction(any());
  }

  @Test
  void withdraw_shouldThrowExceptionWhenBalanceIsInsufficient() {
    request.setAmount(BigDecimal.valueOf(2000));

    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(authenticationService.findLoggedInUser())
        .thenReturn(user);

    assertThrows(InsufficientBalanceException.class,
        () -> accountService.withdraw("112233445501", request));

    verify(accountRepository, never()).save(any());
    verify(transactionService, never()).createTransaction(any());
  }

  @Test
  void withdraw_shouldThrowAccessDeniedWhenUserIsNotOwner() {
    User otherUser = new User();
    otherUser.setUsername("otro");

    Role role = new Role();
    role.setName("CUSTOMER");
    otherUser.setRole(role);

    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(authenticationService.findLoggedInUser())
        .thenReturn(otherUser);

    assertThrows(org.springframework.security.access.AccessDeniedException.class,
        () -> accountService.withdraw("112233445501", request));

    verify(accountRepository, never()).save(any());
    verify(transactionService, never()).createTransaction(any());
  }

  @Test
  void deposit_shouldIncreaseBalanceAndCreateTransaction() {
    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(authenticationService.findLoggedInUser())
        .thenReturn(user);

    when(identifierGenerator.generateUniqueIdentifier(any()))
        .thenReturn("200000000001");

    TransactionResponse transactionResponse = new TransactionResponse();
    when(transactionService.createTransaction(any()))
        .thenReturn(transactionResponse);

    TransactionResponse result = accountService.deposit("112233445501", request);

    assertEquals(BigDecimal.valueOf(1200), account.getBalance());
    assertNotNull(result);

    verify(accountRepository).save(account);
    verify(transactionService).createTransaction(any());
  }

  @Test
  void deposit_shouldThrowAccessDeniedWhenUserIsNotOwner() {
    User otherUser = new User();
    otherUser.setUsername("otro");

    Role role = new Role();
    role.setName("CUSTOMER");
    otherUser.setRole(role);

    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(authenticationService.findLoggedInUser())
        .thenReturn(otherUser);

    assertThrows(org.springframework.security.access.AccessDeniedException.class,
        () -> accountService.deposit("112233445501", request));

    verify(accountRepository, never()).save(any());
    verify(transactionService, never()).createTransaction(any());
  }

  @Test
  void transfer_shouldMoveMoneyBetweenAccountsAndCreateTransaction() {
    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(accountRepository.findByAccountNumber("778899001167"))
        .thenReturn(Optional.of(targetAccount));

    when(authenticationService.findLoggedInUser())
        .thenReturn(user);

    when(identifierGenerator.generateUniqueIdentifier(any()))
        .thenReturn("200000000002");

    TransactionResponse transactionResponse = new TransactionResponse();
    when(transactionService.createTransaction(any()))
        .thenReturn(transactionResponse);

    var transferRequest = new com.facugl.banking_system_server.accounts.dto.request.TransferRequest();
    transferRequest.setTargetAccountNumber("778899001167");
    transferRequest.setAmount(BigDecimal.valueOf(300));
    transferRequest.setComment("Transfer test");

    TransactionResponse result =
        accountService.transfer("112233445501", transferRequest);

    assertEquals(BigDecimal.valueOf(700), account.getBalance());
    assertEquals(BigDecimal.valueOf(800), targetAccount.getBalance());

    verify(accountRepository).save(account);
    verify(accountRepository).save(targetAccount);
    verify(transactionService).createTransaction(any());

    assertNotNull(result);
  }

  @Test
  void transfer_shouldThrowExceptionWhenBalanceIsInsufficient() {
    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(accountRepository.findByAccountNumber("778899001167"))
        .thenReturn(Optional.of(targetAccount));

    when(authenticationService.findLoggedInUser())
        .thenReturn(user);

    var transferRequest = new com.facugl.banking_system_server.accounts.dto.request.TransferRequest();
    transferRequest.setTargetAccountNumber("778899001167");
    transferRequest.setAmount(BigDecimal.valueOf(2000));

    assertThrows(InsufficientBalanceException.class,
        () -> accountService.transfer("112233445501", transferRequest));

    verify(accountRepository, never()).save(any());
    verify(transactionService, never()).createTransaction(any());
  }

  @Test
  void transfer_shouldThrowAccessDeniedWhenUserIsNotOwner() {
    User otherUser = new User();
    otherUser.setUsername("otro");

    Role role = new Role();
    role.setName("CUSTOMER");
    otherUser.setRole(role);

    when(accountRepository.findByAccountNumber("112233445501"))
        .thenReturn(Optional.of(account));

    when(accountRepository.findByAccountNumber("778899001167"))
        .thenReturn(Optional.of(targetAccount));

    when(authenticationService.findLoggedInUser())
        .thenReturn(otherUser);

    var transferRequest = new com.facugl.banking_system_server.accounts.dto.request.TransferRequest();
    transferRequest.setTargetAccountNumber("778899001167");
    transferRequest.setAmount(BigDecimal.valueOf(100));

    assertThrows(org.springframework.security.access.AccessDeniedException.class,
        () -> accountService.transfer("112233445501", transferRequest));

    verify(accountRepository, never()).save(any());
    verify(transactionService, never()).createTransaction(any());
  }

}
