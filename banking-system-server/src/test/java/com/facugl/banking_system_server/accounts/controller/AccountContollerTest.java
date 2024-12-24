package com.facugl.banking_system_server.accounts.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AccountUpdateRequest;
import com.facugl.banking_system_server.accounts.dto.request.AmountRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.entity.AccountType;
import com.facugl.banking_system_server.accounts.service.AccountServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AccountController.class)
public class AccountContollerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AccountServiceImpl accountService;

    @Test
    void createAccount_shouldReturnCreatedAccount() throws Exception {
        AccountCreateRequest request = AccountCreateRequest.builder()
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(1000))
                .build();

        AccountResponse savedAccount = AccountResponse.builder()
                .id(1L)
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(1000))
                .build();

        when(accountService.createAccount(any(AccountCreateRequest.class))).thenReturn(savedAccount);

        mockMvc.perform(post("/api/v1/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(jsonPath("$.type").value("SAVINGS"))
                .andExpect(jsonPath("$.balance").value(1000));

        verify(accountService, times(1)).createAccount(any(AccountCreateRequest.class));
    }

    @Test
    void createAccount_withInvalidRequest_shouldReturnBadRequest() throws Exception {
        AccountCreateRequest request = AccountCreateRequest.builder()
                .accountNumber("")
                .type(null)
                .balance(null)
                .build();

        mockMvc.perform(post("/api/v1/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.frontendMessage").value("Some fields are invalid. Please correct them."))
                .andExpect(jsonPath("$.backendMessage").exists());
    }

    @Test
    void getAccountById_shouldReturnAccount() throws Exception {
        AccountResponse response = AccountResponse.builder()
                .id(1L)
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(1000))
                .build();

        when(accountService.getAccountById(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/accounts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(jsonPath("$.type").value("SAVINGS"))
                .andExpect(jsonPath("$.balance").value(1000));

        verify(accountService, times(1)).getAccountById(1L);
    }

    @Test
    void getAllAccounts_shouldReturnAccountList() throws Exception {
        AccountResponse response1 = AccountResponse.builder()
                .id(1L)
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(1000))
                .build();

        AccountResponse response2 = AccountResponse.builder()
                .id(2L)
                .accountNumber("0987654321")
                .type(AccountType.CHECKING)
                .balance(BigDecimal.valueOf(500))
                .build();

        List<AccountResponse> responses = Arrays.asList(response1, response2);

        when(accountService.getAllAccounts()).thenReturn(responses);

        mockMvc.perform(get("/api/v1/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L));

        verify(accountService, times(1)).getAllAccounts();
    }

    @Test
    void updateAccount_shouldReturnUpdatedAccount() throws Exception {
        AccountUpdateRequest request = AccountUpdateRequest.builder()
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(2000))
                .build();

        AccountResponse response = AccountResponse.builder()
                .id(1L)
                .accountNumber("1234567890")
                .type(AccountType.SAVINGS)
                .balance(BigDecimal.valueOf(2000))
                .build();

        when(accountService.updateAccount(eq(1L), any(AccountUpdateRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/v1/accounts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(jsonPath("$.type").value("SAVINGS"))
                .andExpect(jsonPath("$.balance").value(2000));

        verify(accountService, times(1)).updateAccount(eq(1L), any(AccountUpdateRequest.class));
    }

    @Test
    void updateAccount_withInvalidRequest_shouldReturnBadRequest() throws Exception {
        AccountUpdateRequest request = AccountUpdateRequest.builder()
                .accountNumber("123")
                .balance(BigDecimal.valueOf(-1000))
                .build();

        mockMvc.perform(put("/api/v1/accounts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.frontendMessage").value("Some fields are invalid. Please correct them."))
                .andExpect(jsonPath("$.backendMessage").exists());
    }

    @Test
    void deleteAccount_shouldReturnNoContent() throws Exception {
        doNothing().when(accountService).deleteAccount(1L);

        mockMvc.perform(delete("/api/v1/accounts/1"))
                .andExpect(status().isNoContent());

        verify(accountService, times(1)).deleteAccount(1L);
    }

    @Test
    void deposit_shouldReturnNewBalance() throws Exception {
        AmountRequest request = AmountRequest.builder()
                .amount(BigDecimal.valueOf(500))
                .build();

        when(accountService.deposit(eq(1L), eq(request.getAmount()))).thenReturn(BigDecimal.valueOf(1500));

        mockMvc.perform(post("/api/v1/accounts/1/deposit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("1500"));

        verify(accountService, times(1)).deposit(eq(1L), eq(request.getAmount()));
    }

    @Test
    void deposit_withInvalidRequest_shouldReturnBadRequest() throws Exception {
        AmountRequest request = AmountRequest.builder().amount(null).build();

        mockMvc.perform(post("/api/v1/accounts/1/deposit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.frontendMessage").value("Some fields are invalid. Please correct them."))
                .andExpect(jsonPath("$.backendMessage").exists());
    }

    @Test
    void withdraw_shouldReturnNewBalance() throws Exception {
        AmountRequest request = AmountRequest.builder()
                .amount(BigDecimal.valueOf(200))
                .build();

        when(accountService.withdraw(eq(1L), eq(request.getAmount()))).thenReturn(BigDecimal.valueOf(800));

        mockMvc.perform(post("/api/v1/accounts/1/withdraw")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("800"));

        verify(accountService, times(1)).withdraw(eq(1L), eq(request.getAmount()));
    }

    @Test
    void withdraw_withInvalidRequest_shouldReturnBadRequest() throws Exception {
        AmountRequest request = AmountRequest.builder().amount(null).build();

        mockMvc.perform(post("/api/v1/accounts/1/withdraw")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.frontendMessage").value("Some fields are invalid. Please correct them."))
                .andExpect(jsonPath("$.backendMessage").exists());
    }

    @Test
    void getAccountBalance_shouldReturnBalance() throws Exception {
        when(accountService.getAccountBalance(1L)).thenReturn(BigDecimal.valueOf(1000));

        mockMvc.perform(get("/api/v1/accounts/1/balance"))
                .andExpect(status().isOk())
                .andExpect(content().string("1000"));

        verify(accountService, times(1)).getAccountBalance(1L);
    }

}
