package com.facugl.banking_system_server.admin.roles.controller;

import com.facugl.banking_system_server.admin.roles.dto.request.RoleRequest;
import com.facugl.banking_system_server.admin.roles.dto.response.RoleResponse;
import com.facugl.banking_system_server.admin.roles.service.RoleServiceImpl;
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
    controllers = RoleController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
public class RoleControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private RoleServiceImpl roleService;

  @Test
  void createRole_shouldReturnCreated() throws Exception {
    RoleRequest request = RoleRequest.builder().name("customer").build();
    RoleResponse response = RoleResponse.builder().id(1L).name("CUSTOMER").permissions(List.of()).build();

    when(roleService.createRole(any(RoleRequest.class))).thenReturn(response);

    mockMvc.perform(post("/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.name").value("CUSTOMER"));
  }

  @Test
  void createRole_shouldReturnBadRequestWhenNameIsBlank() throws Exception {
    RoleRequest request = RoleRequest.builder().name("").build();

    mockMvc.perform(post("/roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void getRole_shouldReturnOk() throws Exception {
    RoleResponse response = RoleResponse.builder().id(1L).name("CUSTOMER").permissions(List.of()).build();

    when(roleService.getRole(1L)).thenReturn(response);

    mockMvc.perform(get("/roles/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("CUSTOMER"));
  }

  @Test
  void getAllRoles_shouldReturnOkWhenNonEmpty() throws Exception {
    RoleResponse response = RoleResponse.builder().id(1L).name("CUSTOMER").permissions(List.of()).build();

    when(roleService.getAllRoles()).thenReturn(List.of(response));

    mockMvc.perform(get("/roles"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("CUSTOMER"));
  }

  @Test
  void getAllRoles_shouldReturnNoContentWhenEmpty() throws Exception {
    when(roleService.getAllRoles()).thenReturn(List.of());

    mockMvc.perform(get("/roles"))
        .andExpect(status().isNoContent());
  }

  @Test
  void updateRole_shouldReturnOk() throws Exception {
    RoleRequest request = RoleRequest.builder().name("admin").build();
    RoleResponse response = RoleResponse.builder().id(1L).name("ADMIN").permissions(List.of()).build();

    when(roleService.updateRole(any(RoleRequest.class), eq(1L))).thenReturn(response);

    mockMvc.perform(put("/roles/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("ADMIN"));
  }

  @Test
  void deleteRole_shouldReturnNoContent() throws Exception {
    mockMvc.perform(delete("/roles/1"))
        .andExpect(status().isNoContent());
  }

}
