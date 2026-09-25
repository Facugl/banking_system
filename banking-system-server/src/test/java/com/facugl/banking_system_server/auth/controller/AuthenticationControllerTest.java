package com.facugl.banking_system_server.auth.controller;

import com.facugl.banking_system_server.auth.dto.request.AuthenticationRequest;
import com.facugl.banking_system_server.auth.service.impl.AuthenticationServiceImpl;
import com.facugl.banking_system_server.config.security.filter.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = AuthenticationController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
class AuthenticationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private AuthenticationServiceImpl authenticationService;

  @Test
  void authenticate_shouldReturnUnauthorizedWithGenericMessageWhenUsernameDoesNotExist() throws Exception {
    AuthenticationRequest request = AuthenticationRequest.builder()
        .username("unknown-user")
        .password("whatever")
        .build();

    // DaoAuthenticationProvider normalizes "unknown username" into the same
    // BadCredentialsException a wrong password produces, so this is the only
    // exception the login endpoint should ever see for either case.
    when(authenticationService.login(any(AuthenticationRequest.class)))
        .thenThrow(new BadCredentialsException("Bad credentials"));

    mockMvc.perform(post("/auth/authenticate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.frontendMessage").value("Invalid username or password."));
  }

  @Test
  void authenticate_shouldReturnSameStatusAndMessageWhenPasswordIsWrong() throws Exception {
    AuthenticationRequest request = AuthenticationRequest.builder()
        .username("naruto")
        .password("wrong-password")
        .build();

    when(authenticationService.login(any(AuthenticationRequest.class)))
        .thenThrow(new BadCredentialsException("Bad credentials"));

    mockMvc.perform(post("/auth/authenticate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.frontendMessage").value("Invalid username or password."));
  }

}
