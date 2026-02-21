package com.facugl.banking_system_server.transactions.service;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.accounts.persistence.repository.AccountRepository;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.transactions.dto.TransactionMapper;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.exception.TransactionNotFoundException;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;
import com.facugl.banking_system_server.users.persistence.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceImplTest {

  @Mock
  private TransactionRepository transactionRepository;

  @Mock
  private AccountRepository accountRepository;

  @Mock
  private TransactionMapper transactionMapper;

  @Mock
  private AuthenticationServiceImpl authenticationService;

  @InjectMocks
  private TransactionServiceImpl transactionService;

  private Transaction transaction;
  private TransactionResponse response;

  @BeforeEach
  void setUp() {
    transaction = new Transaction();
    transaction.setTransactionNumber("200000000001");

    response = new TransactionResponse();
  }

  @Test
  void createTransaction_shouldSaveAndReturnResponse() {
    when(transactionRepository.save(transaction)).thenReturn(transaction);
    when(transactionMapper.toResponse(transaction)).thenReturn(response);

    TransactionResponse result = transactionService.createTransaction(transaction);

    assertNotNull(result);
    verify(transactionRepository).save(transaction);
    verify(transactionMapper).toResponse(transaction);
  }

  @Test
  void getTransaction_shouldReturnTransactionWhenExists() {
    when(transactionRepository.findByTransactionNumber("200000000001"))
        .thenReturn(Optional.of(transaction));

    when(transactionMapper.toResponse(transaction))
        .thenReturn(response);

    TransactionResponse result = transactionService.getTransaction("200000000001");

    assertNotNull(result);
    verify(transactionRepository).findByTransactionNumber("200000000001");
  }

  @Test
  void getTransaction_shouldThrowExceptionWhenNotFound() {
    when(transactionRepository.findByTransactionNumber("200000000001"))
        .thenReturn(Optional.empty());

    assertThrows(TransactionNotFoundException.class, () -> {
      transactionService.getTransaction("200000000001");
    });
  }

  @Test
  void getAllTransactions_shouldReturnOnlyCustomerTransactions() {
    User customer = new User();
    Role role = new Role();
    role.setName("CUSTOMER");
    customer.setRole(role);

    Account account = new Account();
    List<Account> accounts = List.of(account);

    List<Transaction> transactions = List.of(transaction);

    when(authenticationService.findLoggedInUser()).thenReturn(customer);
    when(accountRepository.findByOwner(customer)).thenReturn(accounts);
    when(transactionRepository.findBySourceOrTargetAccounts(accounts)).thenReturn(transactions);
    when(transactionMapper.toResponse(transaction)).thenReturn(response);

    List<TransactionResponse> result = transactionService.getAllTransactions();

    assertEquals(1, result.size());
    verify(transactionRepository).findBySourceOrTargetAccounts(accounts);
    verify(transactionRepository, never()).findAll();
  }

  @Test
  void getAllTransactions_shouldReturnAllTransactionsForAdmin() {
    User admin = new User();
    Role role = new Role();
    role.setName("ADMINISTRATOR");
    admin.setRole(role);

    List<Transaction> transactions = List.of(transaction);

    when(authenticationService.findLoggedInUser()).thenReturn(admin);
    when(transactionRepository.findAll()).thenReturn(transactions);
    when(transactionMapper.toResponse(transaction)).thenReturn(response);

    List<TransactionResponse> result = transactionService.getAllTransactions();

    assertEquals(1, result.size());
    verify(transactionRepository).findAll();
    verify(transactionRepository, never()).findBySourceOrTargetAccounts(any());
  }
}
