package com.facugl.banking_system_server.accounts.controller;

import static org.hamcrest.Matchers.comparesEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountStatusRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.TransferRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountStatus;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountType;
import com.facugl.banking_system_server.accounts.service.AccountServiceImpl;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.common.handler.GlobalExceptionHandler;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;
import com.facugl.banking_system_server.users.persistence.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class AccountContollerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Mock
	private AccountServiceImpl accountService;

	@InjectMocks
	private AccountController accountController;

	private User user;
	private AccountResponse accountResponse;
	private TransactionResponse transactionResponse;

	private static final String BASE_URL = "/accounts";
	private static final String TEST_ACCOUNT_NUMBER = "76591142607308616612";
	private static final String TEST_TRANSACTION_NUMBER = "9133817914";
	private static final BigDecimal INITIAL_BALANCE = BigDecimal.valueOf(1000);

	@BeforeEach
	void setUp() {
		objectMapper = new ObjectMapper();

		mockMvc = MockMvcBuilders.standaloneSetup(accountController)
				.setControllerAdvice(new GlobalExceptionHandler())
				.build();

		Role role = Role.builder()
				.name("CUSTOMER")
				.build();

		user = User.builder()
				.id(1L)
				.username("sakura")
				.name("Test User")
				.role(role)
				.build();

		accountResponse = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING)
				.balance(INITIAL_BALANCE)
				.status(AccountStatus.ACTIVE)
				.owner(user.getUsername())
				.build();
	}

	@DisplayName("Create account - Success")
	@Test
	void createAccount_shouldReturnCreatedAccount() throws Exception {
		AccountCreateRequest request = AccountCreateRequest.builder()
				.type(AccountType.CHECKING.name())
				.balance(BigDecimal.valueOf(1000))
				.build();

		when(accountService.createAccount(any(AccountCreateRequest.class))).thenReturn(accountResponse);

		mockMvc.perform(post(BASE_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id", is(1)))
				.andExpect(jsonPath("$.accountNumber", is(TEST_ACCOUNT_NUMBER)));
	}

	@Test
	void createAccount_withInvalidRequest_shouldReturnBadRequest() throws Exception {
		AccountCreateRequest request = AccountCreateRequest.builder()
				.type(null)
				.balance(null)
				.build();

		mockMvc.perform(post(BASE_URL)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void getAccount_shouldReturnAccount() throws Exception {
		when(accountService.getAccountByAccountNumber(TEST_ACCOUNT_NUMBER)).thenReturn(accountResponse);

		mockMvc.perform(get(BASE_URL + "/{account-number}", TEST_ACCOUNT_NUMBER))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.accountNumber", is(TEST_ACCOUNT_NUMBER)))
				.andExpect(jsonPath("$.balance", comparesEqualTo(INITIAL_BALANCE.intValue())));
	}

	@Test
	void getAllAccounts_shouldReturnAccountList() throws Exception {
		when(accountService.getAccountsForCurrentUser()).thenReturn(List.of(accountResponse));

		mockMvc.perform(get(BASE_URL))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1)));
	}

	@DisplayName("Get all accounts - Empty List")
	@Test
	void getAllAccounts_ShouldReturnNoContentWhenEmpty() throws Exception {
		when(accountService.getAccountsForCurrentUser()).thenReturn(Collections.emptyList());

		mockMvc.perform(get(BASE_URL))
				.andExpect(status().isNoContent());
	}

	@DisplayName("Update account - Success")
	@Test
	void updateAccount_shouldReturnUpdatedAccount() throws Exception {
		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.type(AccountType.SAVINGS.name())
				.balance(BigDecimal.valueOf(2000))
				.build();

		AccountResponse updatedAccount = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.SAVINGS)
				.balance(BigDecimal.valueOf(2000))
				.status(AccountStatus.ACTIVE)
				.owner(user.getUsername())
				.build();

		when(accountService.updateAccount(TEST_ACCOUNT_NUMBER, request)).thenReturn(updatedAccount);

		mockMvc.perform(put(BASE_URL + "/{account-number}", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk());
	}

	@Test
	void updateAccount_withInvalidRequest_shouldReturnBadRequest() throws Exception {
		AccountUpdateRequest request = AccountUpdateRequest.builder()
				.balance(BigDecimal.valueOf(-1000))
				.build();

		mockMvc.perform(put(BASE_URL + "/{account-number}", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void updateAccountStatus_ShouldReturnUpdatedAccountStatus() throws Exception {
		AccountStatusRequest request = AccountStatusRequest.builder()
				.status(AccountStatus.INACTIVE.name())
				.build();

		AccountResponse updatedAccount = AccountResponse.builder()
				.id(1L)
				.accountNumber(TEST_ACCOUNT_NUMBER)
				.type(AccountType.CHECKING)
				.balance(INITIAL_BALANCE)
				.status(AccountStatus.INACTIVE)
				.owner(user.getUsername())
				.build();

		when(accountService.updateAccountStatus(TEST_ACCOUNT_NUMBER, request)).thenReturn(updatedAccount);

		mockMvc.perform(patch(BASE_URL + "/{account-number}/change-status", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk());
	}

	@Test
	void deleteAccount_shouldReturnNoContent() throws Exception {
		doNothing().when(accountService).deleteAccount(TEST_ACCOUNT_NUMBER);

		mockMvc.perform(delete(BASE_URL + "/{account-number}", TEST_ACCOUNT_NUMBER))
				.andExpect(status().isNoContent());

		verify(accountService, times(1)).deleteAccount(TEST_ACCOUNT_NUMBER);
	}

	@Test
	void deleteNonExistentAccount_shouldReturnNotFound() throws Exception {
		String invalidAccountNumber = "2390902392939090309";

		doThrow(new AccountNotFoundException(invalidAccountNumber))
				.when(accountService).deleteAccount(invalidAccountNumber);

		mockMvc.perform(delete(BASE_URL + "/{account-number}", invalidAccountNumber)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.frontendMessage").value("The requested account was not found."));

		verify(accountService, times(1)).deleteAccount(invalidAccountNumber);
	}

	@DisplayName("Deposit - Success")
	@Test
	void deposit_ShouldReturnTransactionResponse() throws Exception {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(1000))
				.comment("Deposit test.")
				.build();

		transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.type(TransactionType.DEPOSIT)
				.build();

		when(accountService.deposit(TEST_ACCOUNT_NUMBER, request)).thenReturn(transactionResponse);

		mockMvc.perform(post(BASE_URL + "/{account-number}/deposit", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk());
	}

	@Test
	void deposit_withInvalidRequest_shouldReturnBadRequest() throws Exception {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(-500))
				.comment("Invalid deposit test.")
				.build();

		mockMvc.perform(post(BASE_URL + "/{account-number}/deposit", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void withdraw_ShouldReturnTransactionResponse() throws Exception {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(1000))
				.comment("Withdrawal test.")
				.build();

		transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.type(TransactionType.WITHDRAW)
				.build();

		when(accountService.withdraw(TEST_ACCOUNT_NUMBER, request)).thenReturn(transactionResponse);

		mockMvc.perform(post(BASE_URL + "/{account-number}/withdraw", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk());
	}

	@Test
	void withdraw_withInvalidRequest_shouldReturnBadRequest() throws Exception {
		AccountOperationRequest request = AccountOperationRequest.builder()
				.amount(BigDecimal.valueOf(-5000))
				.comment("Invalid withdrawal test.")
				.build();

		mockMvc.perform(post(BASE_URL + "/{account-number}/withdraw", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void transfer_ShouldReturnTransactionResponse() throws Exception {
		TransferRequest request = TransferRequest.builder()
				.targetAccountNumber("2017374309977551073")
				.amount(BigDecimal.valueOf(500))
				.comment("Transfer test.")
				.build();

		transactionResponse = TransactionResponse.builder()
				.transactionNumber(TEST_TRANSACTION_NUMBER)
				.sourceAccount(TEST_ACCOUNT_NUMBER)
				.targetAccount(request.getTargetAccountNumber())
				.amount(request.getAmount())
				.comment(request.getComment())
				.type(TransactionType.TRANSFER)
				.build();

		when(accountService.transfer(TEST_ACCOUNT_NUMBER, request)).thenReturn(transactionResponse);

		mockMvc.perform(post(BASE_URL + "/{source-account-number}/transfer", TEST_ACCOUNT_NUMBER)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk());
	}

	@Test
	void getAccountBalance_shouldReturnBalance() throws Exception {
		when(accountService.getAccountBalance(TEST_ACCOUNT_NUMBER)).thenReturn(INITIAL_BALANCE);

		mockMvc.perform(get(BASE_URL + "/{account-number}/balance", TEST_ACCOUNT_NUMBER))
				.andExpect(status().isOk());
	}

}
