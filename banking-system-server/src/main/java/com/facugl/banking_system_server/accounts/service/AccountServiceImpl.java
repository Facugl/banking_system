package com.facugl.banking_system_server.accounts.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.accounts.dto.AccountMapper;
import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountStatusRequest;
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
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;
import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;
import com.facugl.banking_system_server.transactions.service.TransactionServiceImpl;
import com.facugl.banking_system_server.users.persistence.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

	private final AccountRepository accountRepository;
	private final TransactionRepository transactionRepository;
	private final TransactionServiceImpl transactionService;
	private final AuthenticationServiceImpl authenticationService;
	private final AccountMapper accountMapper;
	private final IdentifierGenerator identifierGenerator;

	@Override
	@Transactional
	public AccountResponse createAccount(AccountCreateRequest request) {
		User currentUser = authenticationService.findLoggedInUser();

		String accountNumber = identifierGenerator
				.generateUniqueIdentifier(accountRepository::existsByAccountNumber);

		Account account = accountMapper.toEntity(request);

		account.setAccountNumber(accountNumber);
		account.setOwner(currentUser);
		account.setStatus(AccountStatus.ACTIVE);
		account.setCreatedAt(LocalDateTime.now());

		Account savedAccount = accountRepository.save(account);

		return accountMapper.toResponse(savedAccount);
	}

	@Override
	@Transactional(readOnly = true)
	public AccountResponse getAccountByAccountNumber(String accountNumber) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (isUnauthorizedCustomerAction(account)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		return accountMapper.toResponse(account);
	}

	@Override
	@Transactional(readOnly = true)
	public List<AccountResponse> getAccountsForCurrentUser() {
		User currentUser = authenticationService.findLoggedInUser();

		if (currentUser.getRole().getName().equals("CUSTOMER")) {
			return accountRepository.findByOwner(currentUser)
					.stream()
					.map(accountMapper::toResponse)
					.collect(Collectors.toList());
		}

		return accountRepository.findAll()
				.stream()
				.map(accountMapper::toResponse)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public AccountResponse updateAccount(String accountNumber, AccountUpdateRequest request) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (request.getBalance() != null) {
			account.setBalance(request.getBalance());
		}

		if (request.getType() != null) {
			account.setType(AccountType.valueOf(request.getType()));
		}

		if (request.getStatus() != null) {
			account.setStatus(AccountStatus.valueOf(request.getStatus()));
		}

		Account updatedAccount = accountRepository.save(account);

		return accountMapper.toResponse(updatedAccount);
	}

	@Override
	@Transactional
	public AccountResponse updateAccountStatus(String accountNumber, AccountStatusRequest request) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (isUnauthorizedCustomerAction(account)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		account.setStatus(AccountStatus.valueOf(request.getStatus()));

		Account updatedAccount = accountRepository.save(account);

		return accountMapper.toResponse(updatedAccount);
	}

	@Override
	@Transactional
	public void deleteAccount(String accountNumber) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		accountRepository.delete(account);
	}

	@Override
	@Transactional
	public TransactionResponse deposit(String accountNumber, AccountOperationRequest request) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (isUnauthorizedCustomerAction(account)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		BigDecimal amount = request.getAmount();

		account.setBalance(account.getBalance().add(amount));
		accountRepository.save(account);

		String transactionNumber = identifierGenerator
				.generateUniqueIdentifier(transactionRepository::existsByTransactionNumber);

		Transaction transaction = Transaction.builder()
				.transactionNumber(transactionNumber)
				.sourceAccount(null)
				.targetAccount(account)
				.amount(amount)
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.DEPOSIT)
				.comment(request.getComment())
				.build();

		return transactionService.createTransaction(transaction);
	}

	@Override
	@Transactional
	public TransactionResponse withdraw(String accountNumber, AccountOperationRequest request) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (isUnauthorizedCustomerAction(account)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		BigDecimal amount = request.getAmount();
		BigDecimal currentBalance = account.getBalance();

		if (currentBalance.compareTo(amount) < 0) {
			throw new InsufficientBalanceException(accountNumber, currentBalance, amount);
		}

		account.setBalance(currentBalance.subtract(amount));
		accountRepository.save(account);

		String transactionNumber = identifierGenerator
				.generateUniqueIdentifier(transactionRepository::existsByTransactionNumber);

		Transaction transaction = Transaction.builder()
				.transactionNumber(transactionNumber)
				.sourceAccount(account)
				.targetAccount(null)
				.amount(amount)
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.WITHDRAW)
				.comment(request.getComment())
				.build();

		return transactionService.createTransaction(transaction);
	}

	@Override
	@Transactional
	public TransactionResponse transfer(String sourceAccountNumber, TransferRequest request) {
		Account sourceAccount = accountRepository.findByAccountNumber(sourceAccountNumber)
				.orElseThrow(() -> new AccountNotFoundException(sourceAccountNumber));

		String targetAccountNumber = request.getTargetAccountNumber();

		Account targetAccount = accountRepository.findByAccountNumber(targetAccountNumber)
				.orElseThrow(() -> new AccountNotFoundException(targetAccountNumber));

		if (isUnauthorizedCustomerAction(sourceAccount)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		BigDecimal amount = request.getAmount();
		BigDecimal currentBalance = sourceAccount.getBalance();

		if (currentBalance.compareTo(amount) < 0) {
			throw new InsufficientBalanceException(sourceAccountNumber, currentBalance, amount);
		}

		sourceAccount.setBalance(currentBalance.subtract(amount));
		targetAccount.setBalance(targetAccount.getBalance().add(amount));

		accountRepository.save(sourceAccount);
		accountRepository.save(targetAccount);

		String transactionNumber = identifierGenerator
				.generateUniqueIdentifier(transactionRepository::existsByTransactionNumber);

		Transaction sourceTransaction = Transaction.builder()
				.transactionNumber(transactionNumber)
				.sourceAccount(sourceAccount)
				.targetAccount(targetAccount)
				.amount(amount)
				.transactionDate(LocalDateTime.now())
				.type(TransactionType.TRANSFER)
				.comment(request.getComment())
				.build();

		return transactionService.createTransaction(sourceTransaction);
	}

	@Override
	@Transactional(readOnly = true)
	public BigDecimal getAccountBalance(String accountNumber) {
		Account account = accountRepository.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new AccountNotFoundException(accountNumber));

		if (isUnauthorizedCustomerAction(account)) {
			throw new AccessDeniedException("You do not have permission to perform this operation.");
		}

		return account.getBalance();
	}

	private boolean isUnauthorizedCustomerAction(Account account) {
		User currentUser = authenticationService.findLoggedInUser();

		return currentUser.getRole().getName().equals("CUSTOMER") &&
				!account.getOwner().getUsername().equals(currentUser.getUsername());
	}

}
