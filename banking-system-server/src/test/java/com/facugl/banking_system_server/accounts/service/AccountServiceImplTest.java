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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import com.facugl.banking_system_server.accounts.dto.AccountMapper;
import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.TransferRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;
import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountStatus;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountType;
import com.facugl.banking_system_server.accounts.persistence.repository.AccountRepository;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.common.utils.IdentifierGenerator;
import com.facugl.banking_system_server.roles.persistence.entity.Role;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;
import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;
import com.facugl.banking_system_server.transactions.service.TransactionServiceImpl;
import com.facugl.banking_system_server.users.persistence.entity.User;

@ExtendWith(MockitoExtension.class)
public class AccountServiceImplTest {

	private User user;
	private Account account;
	private static final String TEST_ACCOUNT_NUMBER = "76591142607308616612";
	private static final String TEST_TRANSACTION_NUMBER = "9133817914";
	private static final BigDecimal INITIAL_BALANCE = BigDecimal.valueOf(1000);

	@Mock
	private AccountRepository accountRepository;

	@Mock
	private TransactionRepository transactionRepository;

	@Mock
	private TransactionServiceImpl transactionService;

	@Mock
	private AuthenticationServiceImpl authenticationService;

	@Mock
	private AccountMapper accountMapper;

	@Mock
	private IdentifierGenerator identifierGenerator;

	@InjectMocks
	private AccountServiceImpl accountService;

	@BeforeEach
	void setUp() {
		Role role = Role.builder()
				.name("CUSTOMER")
				.build();

		user = User.builder()
				.id(1L)
				.username("testuser")
				.name("Test User")
				.role(role)
				.build();

		account = Account.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING.name())
				.balance(INITIAL_BALANCE)
				.status(AccountStatus.ACTIVE.name())
				.owner(user)
				.build();
	}

	@Test
	void createAccount_ShouldReturnAccountResponse() {
		AccountCreateRequest request = AccountCreateRequest.builder()
				.type(AccountType.CHECKING.name())
				.balance(INITIAL_BALANCE)
				.build();

		Account savedAccount = Account.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING.name())
				.balance(INITIAL_BALANCE)
				.status(AccountStatus.ACTIVE.name())
				.owner(user)
				.build();

		AccountResponse expectedResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING)
				.balance(INITIAL_BALANCE)
				.status(AccountStatus.ACTIVE)
				.owner(user.getUsername())
				.build();

		when(accountMapper.toEntity(request)).thenReturn(account);
		when(accountRepository.save(account)).thenReturn(savedAccount);
		when(accountMapper.toResponse(savedAccount)).thenReturn(expectedResponse);

		AccountResponse response = accountService.createAccount(request);

		assertNotNull(response);
		assertEquals(TEST_ACCOUNT_NUMBER, response.getAccountNumber());

		verify(accountRepository).save(account);
	}

	@Test
	void getAccountByAccountNumber_ShouldReturnAccountResponse() {
		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(user);
		when(accountMapper.toResponse(account)).thenReturn(new AccountResponse());

		AccountResponse response = accountService.getAccountByAccountNumber(TEST_ACCOUNT_NUMBER);

		assertNotNull(response);
		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
	}

	@Test
	void getAccountByAccountNumber_ShouldThrowAccountNotFoundException() {
		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		assertThrows(AccountNotFoundException.class,
				() -> accountService.getAccountByAccountNumber("invalid123"));

		verify(accountRepository).findByAccountNumber("invalid123");
	}

	@Test
	void getAccountsForCurrentUser_ShouldReturnListOfAccounts() {
		AccountResponse accountResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		when(authenticationService.findLoggedInUser()).thenReturn(user);
		when(accountRepository.findByOwner(user)).thenReturn(List.of(account));
		when(accountMapper.toResponse(account)).thenReturn(accountResponse);

		List<AccountResponse> accounts = accountService.getAccountsForCurrentUser();

		assertEquals(1, accounts.size());
		assertEquals(TEST_ACCOUNT_NUMBER, accounts.get(0).getAccountNumber(), "Account number mismatch");
		verify(accountRepository).findByOwner(user);
	}

	@Test
	void getAccountsForCurrentUser_AdminUser_ShouldReturnAllAccounts() {
		Role role = Role.builder()
				.name("ADMINISTRATOR")
				.build();

		User adminUser = User.builder()
				.id(2L)
				.username("admin")
				.role(role)
				.build();

		when(authenticationService.findLoggedInUser()).thenReturn(adminUser);
		when(accountRepository.findAll()).thenReturn(List.of(account));
		when(accountMapper.toResponse(account)).thenReturn(new AccountResponse());

		List<AccountResponse> accounts = accountService.getAccountsForCurrentUser();

		assertEquals(1, accounts.size());
		verify(accountRepository).findAll();
	}

	@Test
	void updateAccount_shouldUpdateAccount_whenAccountExists() {
		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.type(AccountType.SAVINGS.name())
				.balance(BigDecimal.valueOf(2000))
				.build();

		Account updatedAccount = Account.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.SAVINGS.name())
				.balance(BigDecimal.valueOf(2000.00))
				.build();

		AccountResponse accountResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(accountRepository.save(account)).thenReturn(updatedAccount);
		when(accountMapper.toResponse(updatedAccount)).thenReturn(accountResponse);

		AccountResponse response = accountService.updateAccount(TEST_ACCOUNT_NUMBER, request);

		assertNotNull(response);
		assertEquals(TEST_ACCOUNT_NUMBER, response.getAccountNumber());
		assertEquals(BigDecimal.valueOf(2000), response.getBalance());
		assertEquals(AccountType.SAVINGS, response.getType());

		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
		verify(accountRepository).save(account);
		verify(accountMapper).toResponse(updatedAccount);
	}

	@Test
	void updateAccount_shouldThrowException_whenAccountDoesNotExist() {
		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.type(AccountType.SAVINGS.name())
				.balance(BigDecimal.valueOf(2000))
				.build();

		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.updateAccount("invalid123", request));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());

		verify(accountRepository).findByAccountNumber("invalid123");
		verifyNoMoreInteractions(accountRepository, accountMapper);
	}

	@Test
	void deleteAccount_shouldDeleteAccount_whenAccountExists() {
		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));

		accountService.deleteAccount(TEST_ACCOUNT_NUMBER);

		verify(accountRepository).delete(account);
	}

	@Test
	void deleteAccount_throwsException_whenAccountDoesNotExist() {
		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(AccountNotFoundException.class,
				() -> accountService.deleteAccount("invalid123"));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());
	}

	@Test
	void deposit_increasesBalance_whenAccountExists() {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(2000))
				.comment("Test deposit.")
				.build();

		TransactionResponse transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.sourceAccount(null)
				.targetAccount(TEST_ACCOUNT_NUMBER)
				.amount(request.getAmount())
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.DEPOSIT)
				.comment(request.getComment())
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(user);
		when(identifierGenerator.generateUniqueIdentifier(any())).thenReturn(TEST_TRANSACTION_NUMBER);
		when(transactionService.createTransaction(any(Transaction.class))).thenReturn(transactionResponse);

		TransactionResponse response = accountService.deposit(TEST_ACCOUNT_NUMBER, request);

		assertNotNull(response);
		assertEquals(BigDecimal.valueOf(3000), account.getBalance());
		verify(transactionService).createTransaction(any(Transaction.class));
	}

	@Test
	void deposit_throwsException_whenAccountNotFound() {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(1000))
				.comment("Test deposit.")
				.build();

		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(AccountNotFoundException.class,
				() -> accountService.deposit("invalid123", request));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());

		verify(accountRepository).findByAccountNumber("invalid123");
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void withdraw_decreasesBalance_whenSufficientBalance() {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(600))
				.comment("Test withdrawal.")
				.build();

		Account savedAccount = Account.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING.name())
				.balance(BigDecimal.valueOf(400))
				.build();

		TransactionResponse transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.sourceAccount(TEST_ACCOUNT_NUMBER)
				.targetAccount(null)
				.amount(request.getAmount())
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.WITHDRAW)
				.comment(request.getComment())
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(user);
		when(accountRepository.save(account)).thenReturn(savedAccount);
		when(identifierGenerator.generateUniqueIdentifier(any())).thenReturn(TEST_TRANSACTION_NUMBER);
		when(transactionService.createTransaction(any(Transaction.class))).thenReturn(transactionResponse);

		TransactionResponse response = accountService.withdraw(TEST_ACCOUNT_NUMBER, request);

		assertNotNull(response);
		assertEquals(BigDecimal.valueOf(400), savedAccount.getBalance());

		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
		verify(accountRepository).save(account);
	}

	@Test
	void withdraw_throwsException_whenInsufficientBalance() {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(10000))
				.comment("Test withdrawal.")
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(user);

		InsufficientBalanceException exception = assertThrows(InsufficientBalanceException.class,
				() -> accountService.withdraw(TEST_ACCOUNT_NUMBER, request));

		assertEquals(
				"Insufficient balance in account " + TEST_ACCOUNT_NUMBER +
						". Current balance: " + account.getBalance() +
						", attempted withdrawal: " + request.getAmount(),
				exception.getMessage());

		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void withdraw_throwsException_whenAccountNotFound() {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(10000))
				.comment("Test withdrawal.")
				.build();

		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(AccountNotFoundException.class,
				() -> accountService.withdraw("invalid123", request));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());

		verify(accountRepository).findByAccountNumber("invalid123");
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void transfer_shouldTransferAmount_whenAccountsExistAndBalanceIsSufficient() {
		String targetAccountNumber = "2017374309977551073";

		TransferRequest request = TransferRequest.builder()
				.targetAccountNumber(targetAccountNumber)
				.amount(BigDecimal.valueOf(100))
				.comment("Test transfer.")
				.build();

		Account targetAccount = Account.builder()
				.id(2L)
				.accountNumber(targetAccountNumber)
				.balance(BigDecimal.valueOf(3000))
				.build();

		TransactionResponse transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.sourceAccount(TEST_ACCOUNT_NUMBER)
				.targetAccount(targetAccountNumber)
				.amount(request.getAmount())
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.TRANSFER)
				.comment(request.getComment())
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(accountRepository.findByAccountNumber(targetAccountNumber)).thenReturn(Optional.of(targetAccount));
		when(authenticationService.findLoggedInUser()).thenReturn(user);
		when(identifierGenerator.generateUniqueIdentifier(any())).thenReturn(TEST_TRANSACTION_NUMBER);
		when(transactionService.createTransaction(any(Transaction.class))).thenReturn(transactionResponse);

		TransactionResponse response = accountService.transfer(TEST_ACCOUNT_NUMBER, request);

		assertNotNull(response);
		assertEquals(BigDecimal.valueOf(900), account.getBalance());
		assertEquals(BigDecimal.valueOf(3100), targetAccount.getBalance());
		assertEquals(TEST_TRANSACTION_NUMBER, transactionResponse.getTransactionNumber());

		verify(accountRepository).save(account);
		verify(accountRepository).save(targetAccount);
	}

	@Test
	void transfer_shouldThrowException_whenSourceAccountDoesNotExist() {
		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		TransferRequest request = TransferRequest.builder()
				.targetAccountNumber(TEST_ACCOUNT_NUMBER)
				.amount(BigDecimal.valueOf(1000))
				.comment("Test transfer.")
				.build();

		AccountNotFoundException exception = assertThrows(AccountNotFoundException.class,
				() -> accountService.transfer("invalid123", request));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());

		verify(accountRepository, never()).save(any());
	}

	@Test
	void transfer_shouldThrowException_whenTargetAccountDoesNotExist() {
		TransferRequest request = TransferRequest.builder()
				.targetAccountNumber("invalid123")
				.amount(BigDecimal.valueOf(1000))
				.comment("Test transfer.")
				.build();

		when(accountRepository.findByAccountNumber("invalid123")).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(AccountNotFoundException.class,
				() -> accountService.transfer("invalid123", request));

		assertEquals("Account with account number 'invalid123' was not found.",
				exception.getMessage());

		verify(accountRepository, never()).save(any());
	}

	@Test
	void transfer_shouldThrowException_whenInsufficientBalance() {
		String targetAccountNumber = "2017374309977551073";

		TransferRequest request = TransferRequest.builder()
				.targetAccountNumber(targetAccountNumber)
				.amount(BigDecimal.valueOf(2000))
				.comment("Test transfer.")
				.build();

		Account targetAccount = Account.builder()
				.id(2L)
				.accountNumber(targetAccountNumber)
				.balance(BigDecimal.valueOf(1000))
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(accountRepository.findByAccountNumber(targetAccountNumber)).thenReturn(Optional.of(targetAccount));
		when(authenticationService.findLoggedInUser()).thenReturn(user);

		InsufficientBalanceException exception = assertThrows(InsufficientBalanceException.class,
				() -> accountService.transfer(TEST_ACCOUNT_NUMBER, request));

		assertEquals(
				"Insufficient balance in account " + TEST_ACCOUNT_NUMBER +
						". Current balance: " + account.getBalance() +
						", attempted withdrawal: " + request.getAmount(),
				exception.getMessage());

		verify(accountRepository, never()).save(any());
	}

	@Test
	void getAccountBalance_returnsBalance_whenAccountExists() {
		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(user);

		BigDecimal balance = accountService.getAccountBalance(TEST_ACCOUNT_NUMBER);

		assertEquals(BigDecimal.valueOf(1000), balance);
	}

	@Test
	void getAccountBalance_throwsException_whenAccountNotFound() {
		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.empty());

		AccountNotFoundException exception = assertThrows(
				AccountNotFoundException.class,
				() -> accountService.getAccountBalance(TEST_ACCOUNT_NUMBER));

		assertEquals("Account with account number '" + TEST_ACCOUNT_NUMBER + "' was not found.",
				exception.getMessage());

		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void getAccountBalance_throwsException_whenUnauthorizedAccess() {
		User anotherCustomer = User.builder()
				.id(2L)
				.username("anothercustomer")
				.role(Role.builder().name("CUSTOMER").build())
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(anotherCustomer);

		AccessDeniedException exception = assertThrows(AccessDeniedException.class,
				() -> accountService.getAccountBalance(TEST_ACCOUNT_NUMBER));

		assertEquals("You do not have permission to perform this operation.", exception.getMessage());

		verify(accountRepository).findByAccountNumber(TEST_ACCOUNT_NUMBER);
		verifyNoMoreInteractions(accountRepository);
	}

	@Test
	void getAccountBalance_returnsBalance_whenAdminUser() {
		User adminUser = User.builder()
				.id(3L)
				.username("adminuser")
				.role(Role.builder().name("ADMINISTRATOR").build())
				.build();

		when(accountRepository.findByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(Optional.of(account));
		when(authenticationService.findLoggedInUser()).thenReturn(adminUser);

		BigDecimal balance = accountService.getAccountBalance(TEST_ACCOUNT_NUMBER);

		assertEquals(BigDecimal.valueOf(1000), balance);
	}

}
