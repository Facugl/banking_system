package com.facugl.banking_system_server.admin.modules.service;

import com.facugl.banking_system_server.admin.modules.dto.ModuleMapper;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleUpdateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;
import com.facugl.banking_system_server.admin.modules.exception.ModuleAlreadyExistsException;
import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.modules.persistence.repository.ModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ModuleServiceImplTest {

  @Mock
  private ModuleRepository moduleRepository;

  @Mock
  private ModuleMapper moduleMapper;

  @InjectMocks
  private ModuleServiceImpl moduleService;

  private Module module;
  private ModuleCreateRequest createRequest;

  @BeforeEach
  void setUp() {
    module = new Module();
    module.setId(1L);
    module.setName("account");
    module.setBasePath("accounts");

    createRequest = new ModuleCreateRequest();
    createRequest.setName("account");
    createRequest.setBasePath("accounts");
  }

  @Test
  void createModule_shouldUppercaseNameAndNormalizeBasePathThenSave() {
    when(moduleRepository.existsByName("account")).thenReturn(false);
    when(moduleMapper.toEntity(createRequest)).thenReturn(module);
    when(moduleRepository.save(module)).thenReturn(module);

    ModuleResponse response = new ModuleResponse();
    when(moduleMapper.toResponse(module)).thenReturn(response);

    ModuleResponse result = moduleService.createModule(createRequest);

    assertEquals("ACCOUNT", module.getName());
    assertEquals("/accounts", module.getBasePath());
    assertSame(response, result);

    verify(moduleRepository).save(module);
  }

  @Test
  void createModule_shouldThrowWhenNameAlreadyExists() {
    when(moduleRepository.existsByName("account")).thenReturn(true);

    assertThrows(ModuleAlreadyExistsException.class, () -> moduleService.createModule(createRequest));

    verify(moduleRepository, never()).save(any());
  }

  @Test
  void getModuleById_shouldReturnResponseWhenFound() {
    when(moduleRepository.findById(1L)).thenReturn(Optional.of(module));

    ModuleResponse response = new ModuleResponse();
    when(moduleMapper.toResponse(module)).thenReturn(response);

    ModuleResponse result = moduleService.getModuleById(1L);

    assertSame(response, result);
  }

  @Test
  void getModuleById_shouldThrowWhenNotFound() {
    when(moduleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(ModuleNotFoundException.class, () -> moduleService.getModuleById(99L));
  }

  @Test
  void getAllModules_shouldReturnMappedList() {
    ModuleResponse response = new ModuleResponse();
    when(moduleRepository.findAll()).thenReturn(List.of(module));
    when(moduleMapper.toResponse(module)).thenReturn(response);

    List<ModuleResponse> result = moduleService.getAllModules();

    assertEquals(1, result.size());
    assertSame(response, result.get(0));
  }

  @Test
  void getAllModules_shouldReturnEmptyListWhenNoModules() {
    when(moduleRepository.findAll()).thenReturn(List.of());

    assertTrue(moduleService.getAllModules().isEmpty());
  }

  @Test
  void updateModule_shouldUpdateNameAndBasePathWhenProvided() {
    ModuleUpdateRequest updateRequest = new ModuleUpdateRequest();
    updateRequest.setName("transactions");
    updateRequest.setBasePath("txns");

    when(moduleRepository.findById(1L)).thenReturn(Optional.of(module));
    when(moduleRepository.save(module)).thenReturn(module);
    when(moduleMapper.toResponse(module)).thenReturn(new ModuleResponse());

    moduleService.updateModule(1L, updateRequest);

    assertEquals("TRANSACTIONS", module.getName());
    assertEquals("/txns", module.getBasePath());
  }

  @Test
  void updateModule_shouldNotChangeFieldsWhenRequestFieldsAreNull() {
    when(moduleRepository.findById(1L)).thenReturn(Optional.of(module));
    when(moduleRepository.save(module)).thenReturn(module);
    when(moduleMapper.toResponse(module)).thenReturn(new ModuleResponse());

    moduleService.updateModule(1L, new ModuleUpdateRequest());

    assertEquals("account", module.getName());
    assertEquals("accounts", module.getBasePath());
  }

  @Test
  void updateModule_shouldThrowWhenNotFound() {
    when(moduleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(ModuleNotFoundException.class,
        () -> moduleService.updateModule(99L, new ModuleUpdateRequest()));

    verify(moduleRepository, never()).save(any());
  }

  @Test
  void deleteModule_shouldDeleteWhenFound() {
    when(moduleRepository.findById(1L)).thenReturn(Optional.of(module));

    moduleService.deleteModule(1L);

    verify(moduleRepository).delete(module);
  }

  @Test
  void deleteModule_shouldThrowWhenNotFound() {
    when(moduleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(ModuleNotFoundException.class, () -> moduleService.deleteModule(99L));

    verify(moduleRepository, never()).delete(any());
  }

}
