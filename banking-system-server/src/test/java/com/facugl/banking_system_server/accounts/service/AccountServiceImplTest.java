package com.facugl.banking_system_server.accounts.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.facugl.banking_system_server.accounts.dto.AccountMapper;
import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.entity.Account;
import com.facugl.banking_system_server.accounts.entity.AccountType;
import com.facugl.banking_system_server.accounts.exception.AccountAlreadyExistsException;
import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;
import com.facugl.banking_system_server.accounts.repository.AccountRepository;

public class AccountServiceImplTest {

	@Mock
	private AccountRepository accountRepository;

	@Mock
	private AccountMapper accountMapper;

	@InjectMocks
	private AccountServiceImpl accountService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void createAccount_shouldSaveAccount_whenAccountNumberIsNew() {
		String accountNumber = "1234567890";

		AccountCreateRequest request = AccountCreateRequest.builder()
				.accountNumber(accountNumber)
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		Account account = Account.builder()
				.accountNumber(accountNumber)
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		Account savedAccount = Account.builder()
				.id(1L)
				.accountNumber(accountNumber)
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		AccountResponse expectedResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber(accountNumber)
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		when(accountRepository.existsByAccountNumber(accountNumber)).thenReturn(false);
		when(accountMapper.toEntity(request)).thenReturn(account);
		when(accountRepository.save(account)).thenReturn(savedAccount);
		when(accountMapper.toResponse(savedAccount)).thenReturn(expectedResponse);

		AccountResponse response = accountService.createAccount(request);

		assertNotNull(response);
		assertEquals("1234567890", response.getAccountNumber());
		assertEquals(AccountType.CHECKING, response.getType());
		assertEquals(BigDecimal.valueOf(100.00), response.getBalance());

		verify(accountRepository).save(account);
	}

	@Test
	void createAccount_shouldThrowException_whenAccountNumberExists() {
		String accountNumber = "1234567890";

		AccountCreateRequest request = AccountCreateRequest.builder()
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		when(accountRepository.existsByAccountNumber(accountNumber)).thenReturn(true);

		assertThrows(AccountAlreadyExistsException.class, () -> accountService.createAccount(request));

		verify(accountRepository, never()).save(any());
	}

	@Test
	void getAccountById_shouldReturnResponse_whenAccountExists() {
		Long accountId = 1L;

		Account account = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		AccountResponse expectedResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
		when(accountMapper.toResponse(account)).thenReturn(expectedResponse);

		AccountResponse response = accountService.getAccountById(accountId);

		assertNotNull(response);
		assertEquals("1234567890", response.getAccountNumber());

		verify(accountRepository).findById(accountId);
	}

	@Test
	void getAccountById_shouldThrowException_whenAccountDoesNotExist() {
		Long nonExistentAccountId = 99L;

		when(accountRepository.findById(nonExistentAccountId)).thenReturn(Optional.empty());

		assertThrows(AccountNotFoundException.class, () -> accountService.getAccountById(nonExistentAccountId));

		verify(accountRepository).findById(nonExistentAccountId);
	}

	@Test
	void getAllAccounts_shouldReturnMappedResponses_whenAccountsExist() {
		Account account = Account.builder()
				.id(1L)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		AccountResponse expectedResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(100.00))
				.build();

		when(accountRepository.findAll()).thenReturn(List.of(account));
		when(accountMapper.toResponse(account)).thenReturn(expectedResponse);

		List<AccountResponse> responses = accountService.getAllAccounts();

		assertNotNull(responses);
		assertEquals(1, responses.size());
		assertEquals("1234567890", responses.get(0).getAccountNumber());

		verify(accountRepository).findAll();
	}

	@Test
	void updateAccount_shouldUpdateAccount_whenAccountExists() {
		Long accountId = 1L;

		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.accountNumber("1234567890")
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		Account existingAccount = Account.builder()
				.id(accountId)
				.accountNumber("0987654321")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(1000))
				.build();

		Account updatedAccount = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		AccountResponse response = AccountResponse.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(existingAccount));
		when(accountRepository.save(existingAccount)).thenReturn(updatedAccount);
		when(accountMapper.toResponse(updatedAccount)).thenReturn(response);

		AccountResponse result = accountService.updateAccount(accountId, request);

		assertNotNull(result);
		assertEquals("1234567890", result.getAccountNumber());
		assertEquals(BigDecimal.valueOf(2000), result.getBalance());
		assertEquals(AccountType.SAVINGS, result.getType());

		verify(accountRepository).findById(accountId);
		verify(accountRepository).save(existingAccount);
		verify(accountMapper).toResponse(updatedAccount);

	}

	@Test
	void updateAccount_shouldThrowException_whenAccountDoesNotExist() {
		Long accountId = 1L;

		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.accountNumber("1234567890")
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.updateAccount(accountId, request));

		assertEquals("Account with ID '" + accountId + "' was not found.", exception.getMessage());

		verify(accountRepository).findById(accountId);
		verifyNoMoreInteractions(accountRepository, accountMapper);
	}

	@Test
	void deleteAccount_shouldDeleteAccount_whenAccountExists() {
		Long accountId = 1L;
		when(accountRepository.existsById(accountId)).thenReturn(true);

		accountService.deleteAccount(accountId);

		verify(accountRepository).deleteById(accountId);
	}

	@Test
	void deleteAccount_throwsException_whenAccountDoesNotExist() {
		Long nonExistentAccountId = 99L;
		when(accountRepository.existsById(nonExistentAccountId)).thenReturn(false);

		assertThrows(
				AccountNotFoundException.class,
				() -> accountService.deleteAccount(nonExistentAccountId));

		verify(accountRepository, never()).deleteById(nonExistentAccountId);
	}

	@Test
	void deposit_increasesBalance_whenAccountExists() {
		Long accountId = 1L;
		BigDecimal depositAmount = BigDecimal.valueOf(500);

		Account account = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(1000))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
		when(accountRepository.save(account)).thenReturn(account);

		BigDecimal newBalance = accountService.deposit(accountId, depositAmount);

		assertNotNull(newBalance);
		assertEquals(BigDecimal.valueOf(1500), newBalance);

		verify(accountRepository).findById(accountId);
		verify(accountRepository).save(account);
	}

	@Test
	void deposit_throwsException_whenAccountNotFound() {
		Long nonExistentAccountId = 99L;
		BigDecimal depositAmount = BigDecimal.valueOf(500);

		when(accountRepository.findById(nonExistentAccountId)).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.deposit(nonExistentAccountId, depositAmount));

		assertEquals("Account with ID '" + nonExistentAccountId + "' was not found.", exception.getMessage());

		verify(accountRepository).findById(nonExistentAccountId);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void withdraw_decreasesBalance_whenSufficientBalance() {
		Long accountId = 1L;
		BigDecimal withdrawAmount = BigDecimal.valueOf(500);

		Account account = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(1000))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));
		when(accountRepository.save(account)).thenReturn(account);

		BigDecimal newBalance = accountService.withdraw(accountId, withdrawAmount);

		assertNotNull(newBalance);
		assertEquals(BigDecimal.valueOf(500), newBalance);

		verify(accountRepository).findById(accountId);
		verify(accountRepository).save(account);
	}

	@Test
	void withdraw_throwsException_whenInsufficientBalance() {
		Long accountId = 1L;
		BigDecimal withdrawAmount = BigDecimal.valueOf(1500);

		Account account = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(BigDecimal.valueOf(1000))
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));

		InsufficientBalanceException exception = assertThrows(InsufficientBalanceException.class,
				() -> accountService.withdraw(accountId, withdrawAmount));

		assertEquals("Insufficient balance in account " + account.getAccountNumber() +
				". Current balance: " + account.getBalance() + ", attempted withdrawal: " + withdrawAmount,
				exception.getMessage());

		verify(accountRepository).findById(accountId);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void withdraw_throwsException_whenAccountNotFound() {
		Long accountId = 1L;
		BigDecimal withdrawAmount = BigDecimal.valueOf(500);

		when(accountRepository.findById(accountId)).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.withdraw(accountId, withdrawAmount));

		assertEquals("Account with ID '" + accountId + "' was not found.", exception.getMessage());

		verify(accountRepository).findById(accountId);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void getAccountBalance_returnsBalance_whenAccountExists() {
		Long accountId = 1L;
		BigDecimal balance = BigDecimal.valueOf(1000);

		Account account = Account.builder()
				.id(accountId)
				.accountNumber("1234567890")
				.type(AccountType.CHECKING)
				.balance(balance)
				.build();

		when(accountRepository.findById(accountId)).thenReturn(Optional.of(account));

		BigDecimal returnedBalance = accountService.getAccountBalance(accountId);

		assertNotNull(returnedBalance);
		assertEquals(balance, returnedBalance);

		verify(accountRepository).findById(accountId);
	}

	@Test
	void getAccountBalance_throwsException_whenAccountNotFound() {
		Long accountId = 1L;

		when(accountRepository.findById(accountId)).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.getAccountBalance(accountId));

		assertEquals("Account with ID '" + accountId + "' was not found.", exception.getMessage());

		verify(accountRepository).findById(accountId);
		verifyNoMoreInteractions(accountRepository);
	}

}
