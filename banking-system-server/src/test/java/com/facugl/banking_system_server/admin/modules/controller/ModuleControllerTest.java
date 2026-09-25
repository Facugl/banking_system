package com.facugl.banking_system_server.admin.modules.controller;

import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleUpdateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;
import com.facugl.banking_system_server.admin.modules.service.ModuleServiceImpl;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = ModuleController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JwtAuthenticationFilter.class
    )
)
@AutoConfigureMockMvc(addFilters = false)
public class ModuleControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private ModuleServiceImpl moduleService;

  @Test
  void createModule_shouldReturnCreated() throws Exception {
    ModuleCreateRequest request = ModuleCreateRequest.builder().name("account").basePath("accounts").build();
    ModuleResponse response = ModuleResponse.builder().id(1L).name("ACCOUNT").basePath("/accounts").build();

    when(moduleService.createModule(request)).thenReturn(response);

    mockMvc.perform(post("/modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.name").value("ACCOUNT"))
        .andExpect(jsonPath("$.basePath").value("/accounts"));
  }

  @Test
  void createModule_shouldReturnBadRequestWhenNameIsBlank() throws Exception {
    ModuleCreateRequest request = ModuleCreateRequest.builder().name("").basePath("accounts").build();

    mockMvc.perform(post("/modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void getModule_shouldReturnOk() throws Exception {
    ModuleResponse response = ModuleResponse.builder().id(1L).name("ACCOUNT").basePath("/accounts").build();

    when(moduleService.getModuleById(1L)).thenReturn(response);

    mockMvc.perform(get("/modules/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("ACCOUNT"));
  }

  @Test
  void getAllModules_shouldReturnOkWhenNonEmpty() throws Exception {
    ModuleResponse response = ModuleResponse.builder().id(1L).name("ACCOUNT").basePath("/accounts").build();

    when(moduleService.getAllModules()).thenReturn(List.of(response));

    mockMvc.perform(get("/modules"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("ACCOUNT"));
  }

  @Test
  void getAllModules_shouldReturnNoContentWhenEmpty() throws Exception {
    when(moduleService.getAllModules()).thenReturn(List.of());

    mockMvc.perform(get("/modules"))
        .andExpect(status().isNoContent());
  }

  @Test
  void updateModule_shouldReturnOk() throws Exception {
    ModuleUpdateRequest request = ModuleUpdateRequest.builder().name("transactions").build();
    ModuleResponse response = ModuleResponse.builder().id(1L).name("TRANSACTIONS").basePath("/accounts").build();

    when(moduleService.updateModule(1L, request)).thenReturn(response);

    mockMvc.perform(put("/modules/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("TRANSACTIONS"));
  }

  @Test
  void deleteModule_shouldReturnNoContent() throws Exception {
    mockMvc.perform(delete("/modules/1"))
        .andExpect(status().isNoContent());
  }

}
