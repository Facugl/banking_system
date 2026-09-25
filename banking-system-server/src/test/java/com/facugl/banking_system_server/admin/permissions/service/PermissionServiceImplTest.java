package com.facugl.banking_system_server.admin.permissions.service;

import com.facugl.banking_system_server.admin.permissions.dto.GrantedPermissionMapper;
import com.facugl.banking_system_server.admin.permissions.dto.GrantedPermissionMapperHelper;
import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.exception.GrantedPermissionNotFoundException;
import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;
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
class PermissionServiceImplTest {

  @Mock
  private PermissionRepository permissionRepository;

  @Mock
  private GrantedPermissionMapper permissionMapper;

  @Mock
  private GrantedPermissionMapperHelper permissionMapperHelper;

  @InjectMocks
  private PermissionServiceImpl permissionService;

  private GrantedPermission permission;
  private PermissionRequest request;

  @BeforeEach
  void setUp() {
    permission = new GrantedPermission();
    permission.setId(1L);

    request = new PermissionRequest();
    request.setRole("CUSTOMER");
    request.setOperation("READ_ONE_ACCOUNT");
  }

  @Test
  void createPermission_shouldSaveAndReturnResponse() {
    when(permissionMapper.toEntity(request, permissionMapperHelper)).thenReturn(permission);
    when(permissionRepository.save(permission)).thenReturn(permission);

    PermissionResponse response = new PermissionResponse();
    when(permissionMapper.toResponse(permission, permissionMapperHelper)).thenReturn(response);

    PermissionResponse result = permissionService.createPermission(request);

    assertSame(response, result);
    verify(permissionRepository).save(permission);
  }

  @Test
  void getPermissionById_shouldReturnResponseWhenFound() {
    when(permissionRepository.findById(1L)).thenReturn(Optional.of(permission));

    PermissionResponse response = new PermissionResponse();
    when(permissionMapper.toResponse(permission, permissionMapperHelper)).thenReturn(response);

    PermissionResponse result = permissionService.getPermissionById(1L);

    assertSame(response, result);
  }

  @Test
  void getPermissionById_shouldThrowWhenNotFound() {
    when(permissionRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(GrantedPermissionNotFoundException.class,
        () -> permissionService.getPermissionById(99L));
  }

  @Test
  void getAllPermissions_shouldReturnMappedList() {
    PermissionResponse response = new PermissionResponse();
    when(permissionRepository.findAll()).thenReturn(List.of(permission));
    when(permissionMapper.toResponse(permission, permissionMapperHelper)).thenReturn(response);

    List<PermissionResponse> result = permissionService.getAllPermissions();

    assertEquals(1, result.size());
    assertSame(response, result.get(0));
  }

  @Test
  void getAllPermissions_shouldReturnEmptyListWhenNoPermissions() {
    when(permissionRepository.findAll()).thenReturn(List.of());

    List<PermissionResponse> result = permissionService.getAllPermissions();

    assertTrue(result.isEmpty());
  }

  @Test
  void deletePermission_shouldDeleteWhenFound() {
    when(permissionRepository.findById(1L)).thenReturn(Optional.of(permission));

    permissionService.deletePermission(1L);

    verify(permissionRepository).delete(permission);
  }

  @Test
  void deletePermission_shouldThrowWhenNotFound() {
    when(permissionRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(GrantedPermissionNotFoundException.class,
        () -> permissionService.deletePermission(99L));

    verify(permissionRepository, never()).delete(any());
  }

}
