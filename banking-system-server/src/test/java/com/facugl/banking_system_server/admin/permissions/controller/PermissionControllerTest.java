package com.facugl.banking_system_server.admin.permissions.controller;

import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.service.PermissionServiceImpl;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = PermissionController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
public class PermissionControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private PermissionServiceImpl permissionService;

  @Test
  void createPermission_shouldReturnCreated() throws Exception {
    PermissionRequest request = PermissionRequest.builder()
        .role("CUSTOMER")
        .operation("READ_ONE_ACCOUNT")
        .build();
    PermissionResponse response = PermissionResponse.builder()
        .id(1L)
        .role("CUSTOMER")
        .operation("READ_ONE_ACCOUNT")
        .module("ACCOUNT")
        .build();

    when(permissionService.createPermission(request)).thenReturn(response);

    mockMvc.perform(post("/permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.role").value("CUSTOMER"))
        .andExpect(jsonPath("$.operation").value("READ_ONE_ACCOUNT"));
  }

  @Test
  void createPermission_shouldReturnBadRequestWhenRoleIsBlank() throws Exception {
    PermissionRequest request = PermissionRequest.builder().role("").operation("READ_ONE_ACCOUNT").build();

    mockMvc.perform(post("/permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void getPermission_shouldReturnOk() throws Exception {
    PermissionResponse response = PermissionResponse.builder().id(1L).role("CUSTOMER").build();

    when(permissionService.getPermissionById(1L)).thenReturn(response);

    mockMvc.perform(get("/permissions/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.role").value("CUSTOMER"));
  }

  @Test
  void getPermissions_shouldReturnOkWhenNonEmpty() throws Exception {
    PermissionResponse response = PermissionResponse.builder().id(1L).role("CUSTOMER").build();

    when(permissionService.getAllPermissions()).thenReturn(List.of(response));

    mockMvc.perform(get("/permissions"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].role").value("CUSTOMER"));
  }

  @Test
  void getPermissions_shouldReturnNoContentWhenEmpty() throws Exception {
    when(permissionService.getAllPermissions()).thenReturn(List.of());

    mockMvc.perform(get("/permissions"))
        .andExpect(status().isNoContent());
  }

  @Test
  void deletePermission_shouldReturnNoContent() throws Exception {
    mockMvc.perform(delete("/permissions/1"))
        .andExpect(status().isNoContent());
  }

}
