package com.facugl.banking_system_server.admin.operations.service;

import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.modules.persistence.repository.ModuleRepository;
import com.facugl.banking_system_server.admin.operations.dto.OperationMapper;
import com.facugl.banking_system_server.admin.operations.dto.OperationMapperHelper;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationUpdateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.exception.OperationNotFoundException;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.admin.permissions.persistence.repository.PermissionRepository;
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
class OperationServiceImplTest {

  @Mock
  private ModuleRepository moduleRepository;

  @Mock
  private OperationRepository operationRepository;

  @Mock
  private PermissionRepository permissionRepository;

  @Mock
  private OperationMapper operationMapper;

  @Mock
  private OperationMapperHelper operationMapperHelper;

  @InjectMocks
  private OperationServiceImpl operationService;

  private Operation operation;
  private OperationCreateRequest createRequest;

  @BeforeEach
  void setUp() {
    operation = new Operation();
    operation.setId(1L);
    operation.setName("read one!");
    operation.setPath("/[0-9]*");
    operation.setHttpMethod("get");
    operation.setPermitAll(false);

    createRequest = new OperationCreateRequest();
    createRequest.setName("read one!");
    createRequest.setPath("/[0-9]*");
    createRequest.setHttpMethod("get");
    createRequest.setPermitAll(false);
    createRequest.setModuleId(1L);
  }

  @Test
  void createOperation_shouldNormalizeNameAndUppercaseHttpMethodThenSave() {
    when(operationMapper.toEntity(createRequest, operationMapperHelper)).thenReturn(operation);
    when(operationRepository.save(operation)).thenReturn(operation);

    OperationResponse response = new OperationResponse();
    when(operationMapper.toResponse(operation, operationMapperHelper)).thenReturn(response);

    OperationResponse result = operationService.createOperation(createRequest);

    assertEquals("READ_ONE", operation.getName());
    assertEquals("GET", operation.getHttpMethod());
    assertSame(response, result);

    verify(operationRepository).save(operation);
  }

  @Test
  void getOperation_shouldReturnResponseWhenFound() {
    when(operationRepository.findById(1L)).thenReturn(Optional.of(operation));

    OperationResponse response = new OperationResponse();
    when(operationMapper.toResponse(operation, operationMapperHelper)).thenReturn(response);

    OperationResponse result = operationService.getOperation(1L);

    assertSame(response, result);
  }

  @Test
  void getOperation_shouldThrowWhenNotFound() {
    when(operationRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(OperationNotFoundException.class, () -> operationService.getOperation(99L));
  }

  @Test
  void getAllOperations_shouldReturnMappedList() {
    OperationResponse response = new OperationResponse();
    when(operationRepository.findAll()).thenReturn(List.of(operation));
    when(operationMapper.toResponse(operation, operationMapperHelper)).thenReturn(response);

    List<OperationResponse> result = operationService.getAllOperations();

    assertEquals(1, result.size());
    assertSame(response, result.get(0));
  }

  @Test
  void getAllOperations_shouldReturnEmptyListWhenNoOperations() {
    when(operationRepository.findAll()).thenReturn(List.of());

    assertTrue(operationService.getAllOperations().isEmpty());
  }

  @Test
  void updateOperation_shouldUpdateAllProvidedFields() {
    Module module = new Module();
    module.setId(2L);
    module.setName("ACCOUNT");

    OperationUpdateRequest updateRequest = new OperationUpdateRequest();
    updateRequest.setName("new name!");
    updateRequest.setPath("/new-path");
    updateRequest.setHttpMethod("POST");
    updateRequest.setPermitAll(true);
    updateRequest.setModuleId(2L);

    when(operationRepository.findById(1L)).thenReturn(Optional.of(operation));
    when(moduleRepository.findById(2L)).thenReturn(Optional.of(module));
    when(operationRepository.save(operation)).thenReturn(operation);

    OperationResponse response = new OperationResponse();
    when(operationMapper.toResponse(operation, operationMapperHelper)).thenReturn(response);

    OperationResponse result = operationService.updateOperation(updateRequest, 1L);

    assertEquals("NEW_NAME", operation.getName());
    assertEquals("/new-path", operation.getPath());
    assertEquals("POST", operation.getHttpMethod());
    assertEquals(true, operation.getPermitAll());
    assertSame(module, operation.getModule());
    assertSame(response, result);
  }

  @Test
  void updateOperation_shouldNotChangeFieldsWhenRequestFieldsAreNull() {
    OperationUpdateRequest updateRequest = new OperationUpdateRequest();

    when(operationRepository.findById(1L)).thenReturn(Optional.of(operation));
    when(operationRepository.save(operation)).thenReturn(operation);
    when(operationMapper.toResponse(operation, operationMapperHelper)).thenReturn(new OperationResponse());

    operationService.updateOperation(updateRequest, 1L);

    assertEquals("read one!", operation.getName());
    assertEquals("/[0-9]*", operation.getPath());
    assertEquals("get", operation.getHttpMethod());
    assertEquals(false, operation.getPermitAll());
    assertNull(operation.getModule());

    verify(moduleRepository, never()).findById(any());
  }

  @Test
  void updateOperation_shouldThrowWhenOperationNotFound() {
    when(operationRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(OperationNotFoundException.class,
        () -> operationService.updateOperation(new OperationUpdateRequest(), 99L));

    verify(operationRepository, never()).save(any());
  }

  @Test
  void updateOperation_shouldThrowWhenModuleNotFound() {
    OperationUpdateRequest updateRequest = new OperationUpdateRequest();
    updateRequest.setModuleId(99L);

    when(operationRepository.findById(1L)).thenReturn(Optional.of(operation));
    when(moduleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(ModuleNotFoundException.class,
        () -> operationService.updateOperation(updateRequest, 1L));

    verify(operationRepository, never()).save(any());
  }

  @Test
  void deleteOperation_shouldDeletePermissionsThenOperation() {
    when(operationRepository.findById(1L)).thenReturn(Optional.of(operation));

    operationService.deleteOperation(1L);

    verify(permissionRepository).deleteByOperationId(1L);
    verify(operationRepository).delete(operation);
  }

  @Test
  void deleteOperation_shouldThrowWhenNotFound() {
    when(operationRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(OperationNotFoundException.class, () -> operationService.deleteOperation(99L));

    verify(permissionRepository, never()).deleteByOperationId(any());
    verify(operationRepository, never()).delete(any());
  }

}
