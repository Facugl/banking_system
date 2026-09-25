package com.facugl.banking_system_server.admin.operations.controller;

import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationUpdateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.service.OperationServiceImpl;
import com.facugl.banking_system_server.config.security.filter.JwtAuthenticationFilter;
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

import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = OperationController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
public class OperationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private OperationServiceImpl operationService;

  @Test
  void createOperation_shouldReturnCreated() throws Exception {
    OperationCreateRequest request = OperationCreateRequest.builder()
        .name("read one account")
        .path("/[0-9]*")
        .httpMethod("get")
        .permitAll(false)
        .moduleId(1L)
        .build();
    OperationResponse response = OperationResponse.builder()
        .id(1L)
        .name("READ_ONE_ACCOUNT")
        .path("/[0-9]*")
        .httpMethod("GET")
        .permitAll(false)
        .moduleName("ACCOUNT")
        .build();

    when(operationService.createOperation(any(OperationCreateRequest.class))).thenReturn(response);

    mockMvc.perform(post("/operations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.name").value("READ_ONE_ACCOUNT"))
        .andExpect(jsonPath("$.httpMethod").value("GET"));
  }

  @Test
  void createOperation_shouldReturnCreatedWhenPathHasExtraSegmentsAfterWildcard() throws Exception {
    OperationCreateRequest request = OperationCreateRequest.builder()
        .name("deposit into account")
        .path("/[0-9]*/deposit")
        .httpMethod("post")
        .permitAll(false)
        .moduleId(1L)
        .build();
    OperationResponse response = OperationResponse.builder()
        .id(2L)
        .name("DEPOSIT_INTO_ACCOUNT")
        .path("/[0-9]*/deposit")
        .httpMethod("POST")
        .permitAll(false)
        .moduleName("ACCOUNT")
        .build();

    when(operationService.createOperation(any(OperationCreateRequest.class))).thenReturn(response);

    mockMvc.perform(post("/operations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.path").value("/[0-9]*/deposit"));
  }

  @Test
  void createOperation_shouldReturnBadRequestWhenPathIsNotWildcardOrEmpty() throws Exception {
    OperationCreateRequest request = OperationCreateRequest.builder()
        .name("read one account")
        .path("/123")
        .httpMethod("get")
        .permitAll(false)
        .moduleId(1L)
        .build();

    mockMvc.perform(post("/operations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void createOperation_shouldReturnBadRequestWhenHttpMethodIsInvalid() throws Exception {
    OperationCreateRequest request = OperationCreateRequest.builder()
        .name("read one account")
        .path("/[0-9]*")
        .httpMethod("INVALID")
        .permitAll(false)
        .moduleId(1L)
        .build();

    mockMvc.perform(post("/operations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void getOperation_shouldReturnOk() throws Exception {
    OperationResponse response = OperationResponse.builder().id(1L).name("READ_ONE_ACCOUNT").build();

    when(operationService.getOperation(1L)).thenReturn(response);

    mockMvc.perform(get("/operations/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("READ_ONE_ACCOUNT"));
  }

  @Test
  void getAllOperations_shouldReturnOkWhenNonEmpty() throws Exception {
    OperationResponse response = OperationResponse.builder().id(1L).name("READ_ONE_ACCOUNT").build();

    when(operationService.getAllOperations()).thenReturn(List.of(response));

    mockMvc.perform(get("/operations"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("READ_ONE_ACCOUNT"));
  }

  @Test
  void getAllOperations_shouldReturnNoContentWhenEmpty() throws Exception {
    when(operationService.getAllOperations()).thenReturn(List.of());

    mockMvc.perform(get("/operations"))
        .andExpect(status().isNoContent());
  }

  @Test
  void updateOperation_shouldReturnOk() throws Exception {
    OperationUpdateRequest request = OperationUpdateRequest.builder().permitAll(true).build();
    OperationResponse response = OperationResponse.builder().id(1L).name("READ_ONE_ACCOUNT").permitAll(true).build();

    when(operationService.updateOperation(any(OperationUpdateRequest.class), eq(1L))).thenReturn(response);

    mockMvc.perform(put("/operations/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.permitAll").value(true));
  }

  @Test
  void deleteOperation_shouldReturnNoContent() throws Exception {
    mockMvc.perform(delete("/operations/1"))
        .andExpect(status().isNoContent());
  }

}
