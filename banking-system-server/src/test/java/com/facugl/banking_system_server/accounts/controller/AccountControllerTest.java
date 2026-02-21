package com.facugl.banking_system_server.accounts.controller;

import com.facugl.banking_system_server.accounts.dto.request.AccountOperationRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.service.AccountServiceImpl;
import com.facugl.banking_system_server.config.security.filter.JwtAuthenticationFilter;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = AccountController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
public class AccountControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private AccountServiceImpl accountService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void getAccount_shouldReturnAccount() throws Exception {
    AccountResponse response = new AccountResponse();
    response.setAccountNumber("112233445501");

    when(accountService.getAccountByAccountNumber("112233445501"))
        .thenReturn(response);

    mockMvc.perform(get("/accounts/112233445501"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accountNumber").value("112233445501"));
  }

  @Test
  void getAllAccounts_shouldReturnList() throws Exception {
    AccountResponse response = new AccountResponse();
    response.setAccountNumber("112233445501");

    when(accountService.getAccountsForCurrentUser())
        .thenReturn(List.of(response));

    mockMvc.perform(get("/accounts"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].accountNumber").value("112233445501"));
  }

  @Test
  void getAllAccounts_shouldReturnNoContentWhenEmpty() throws Exception {
    when(accountService.getAccountsForCurrentUser())
        .thenReturn(List.of());

    mockMvc.perform(get("/accounts"))
        .andExpect(status().isNoContent());
  }

  @Test
  void deposit_shouldReturnTransaction() throws Exception {
    AccountOperationRequest request = new AccountOperationRequest();
    request.setAmount(BigDecimal.valueOf(200));
    request.setComment("Test deposit");

    TransactionResponse response = new TransactionResponse();

    when(accountService.deposit("112233445501", request))
        .thenReturn(response);

    mockMvc.perform(post("/accounts/112233445501/deposit")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());
  }

  @Test
  void withdraw_shouldReturnTransaction() throws Exception {
    AccountOperationRequest request = new AccountOperationRequest();
    request.setAmount(BigDecimal.valueOf(100));

    TransactionResponse response = new TransactionResponse();

    when(accountService.withdraw("112233445501", request))
        .thenReturn(response);

    mockMvc.perform(post("/accounts/112233445501/withdraw")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());
  }

  @Test
  void transfer_shouldReturnTransaction() throws Exception {
    var request = new com.facugl.banking_system_server.accounts.dto.request.TransferRequest();
    request.setTargetAccountNumber("778899001167");
    request.setAmount(BigDecimal.valueOf(300));

    TransactionResponse response = new TransactionResponse();

    when(accountService.transfer("112233445501", request))
        .thenReturn(response);

    mockMvc.perform(post("/accounts/112233445501/transfer")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());
  }

}
