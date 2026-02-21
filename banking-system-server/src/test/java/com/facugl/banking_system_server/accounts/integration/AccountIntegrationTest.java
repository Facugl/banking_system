package com.facugl.banking_system_server.accounts.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AccountIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  @DisplayName("Should return account details when account exists")
  @WithMockUser(username = "testuser")
  void shouldReturnAccountById() throws Exception {
    mockMvc.perform(get("/accounts/100000000001"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accountNumber").value("100000000001"))
        .andExpect(jsonPath("$.balance").value(1500));
  }

  @Test
  @DisplayName("Should deposit money into account")
  @WithMockUser(username = "testuser")
  void shouldDepositIntoAccount() throws Exception {
    String requestBody = """
        {
          "amount": 500,
          "comment": "Test deposit"
        }
        """;

    mockMvc.perform(post("/accounts/100000000001/deposit")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
        .andExpect(status().isOk());

    // Verify balance updated
    mockMvc.perform(get("/accounts/100000000001"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.balance").value(1500));
  }

  @Test
  @DisplayName("Should transfer money between accounts")
  @WithMockUser(username = "testuser")
  void shouldTransferBetweenAccounts() throws Exception {
    String requestBody = """
        {
          "targetAccountNumber": 100000000002,
          "amount": 500,
          "comment": "Test transfer"
        }
        """;

    mockMvc.perform(post("/accounts/100000000001/transfer")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
        .andExpect(status().isOk());

    // Verify source account balance
    mockMvc.perform(get("/accounts/100000000001"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.balance").value(1000));

    // Verify target account balance
    mockMvc.perform(get("/accounts/100000000002"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.balance").value(1000));
  }
}
