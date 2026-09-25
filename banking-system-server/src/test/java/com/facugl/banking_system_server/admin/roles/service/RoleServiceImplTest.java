package com.facugl.banking_system_server.admin.roles.service;

import com.facugl.banking_system_server.admin.roles.dto.RoleMapper;
import com.facugl.banking_system_server.admin.roles.dto.request.RoleRequest;
import com.facugl.banking_system_server.admin.roles.dto.response.RoleResponse;
import com.facugl.banking_system_server.admin.roles.exception.RoleAlreadyExistsException;
import com.facugl.banking_system_server.admin.roles.exception.RoleNotFoundException;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.admin.roles.persistence.repository.RoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoleServiceImplTest {

  @Mock
  private RoleRepository roleRepository;

  @Mock
  private RoleMapper roleMapper;

  @InjectMocks
  private RoleServiceImpl roleService;

  private Role role;
  private RoleRequest request;

  @BeforeEach
  void setUp() {
    role = new Role();
    role.setId(1L);
    role.setName("CUSTOMER");

    request = new RoleRequest();
    request.setName("customer");
  }

  @Test
  void createRole_shouldSaveAndReturnResponseWhenNameIsAvailable() {
    when(roleRepository.existsByName("customer")).thenReturn(false);
    when(roleMapper.toEntity(request)).thenReturn(role);
    when(roleRepository.save(role)).thenReturn(role);

    RoleResponse response = new RoleResponse();
    when(roleMapper.toResponse(role)).thenReturn(response);

    RoleResponse result = roleService.createRole(request);

    assertEquals("CUSTOMER", role.getName());
    assertNotNull(result);

    verify(roleRepository).save(role);
  }

  @Test
  void createRole_shouldThrowWhenNameAlreadyExists() {
    when(roleRepository.existsByName("customer")).thenReturn(true);

    assertThrows(RoleAlreadyExistsException.class, () -> roleService.createRole(request));

    verify(roleRepository, never()).save(any());
  }

  @Test
  void getRole_shouldReturnResponseWhenFound() {
    when(roleRepository.findById(1L)).thenReturn(Optional.of(role));

    RoleResponse response = new RoleResponse();
    when(roleMapper.toResponse(role)).thenReturn(response);

    RoleResponse result = roleService.getRole(1L);

    assertSame(response, result);
  }

  @Test
  void getRole_shouldThrowWhenNotFound() {
    when(roleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(RoleNotFoundException.class, () -> roleService.getRole(99L));
  }

  @Test
  void getAllRoles_shouldReturnMappedList() {
    RoleResponse response = new RoleResponse();
    when(roleRepository.findAll()).thenReturn(List.of(role));
    when(roleMapper.toResponse(role)).thenReturn(response);

    List<RoleResponse> result = roleService.getAllRoles();

    assertEquals(1, result.size());
    assertSame(response, result.get(0));
  }

  @Test
  void getAllRoles_shouldReturnEmptyListWhenNoRoles() {
    when(roleRepository.findAll()).thenReturn(List.of());

    List<RoleResponse> result = roleService.getAllRoles();

    assertTrue(result.isEmpty());
  }

  @Test
  void findDefaultRole_shouldLookUpRoleUsingConfiguredDefaultRoleName() {
    ReflectionTestUtils.setField(roleService, "defaultRole", "CUSTOMER");
    when(roleRepository.findByName("CUSTOMER")).thenReturn(Optional.of(role));

    Optional<Role> result = roleService.findDefaultRole();

    assertTrue(result.isPresent());
    assertSame(role, result.get());
    verify(roleRepository).findByName("CUSTOMER");
  }

  @Test
  void updateRole_shouldUpdateNameWhenProvided() {
    when(roleRepository.findById(1L)).thenReturn(Optional.of(role));
    when(roleRepository.save(role)).thenReturn(role);

    RoleResponse response = new RoleResponse();
    when(roleMapper.toResponse(role)).thenReturn(response);

    RoleRequest updateRequest = new RoleRequest();
    updateRequest.setName("admin");

    RoleResponse result = roleService.updateRole(updateRequest, 1L);

    assertEquals("ADMIN", role.getName());
    assertNotNull(result);
  }

  @Test
  void updateRole_shouldNotChangeNameWhenRequestNameIsNull() {
    when(roleRepository.findById(1L)).thenReturn(Optional.of(role));
    when(roleRepository.save(role)).thenReturn(role);
    when(roleMapper.toResponse(role)).thenReturn(new RoleResponse());

    RoleRequest updateRequest = new RoleRequest();

    roleService.updateRole(updateRequest, 1L);

    assertEquals("CUSTOMER", role.getName());
  }

  @Test
  void updateRole_shouldThrowWhenNotFound() {
    when(roleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(RoleNotFoundException.class, () -> roleService.updateRole(request, 99L));

    verify(roleRepository, never()).save(any());
  }

  @Test
  void deleteRole_shouldDeleteWhenFound() {
    when(roleRepository.findById(1L)).thenReturn(Optional.of(role));

    roleService.deleteRole(1L);

    verify(roleRepository).delete(role);
  }

  @Test
  void deleteRole_shouldThrowWhenNotFound() {
    when(roleRepository.findById(99L)).thenReturn(Optional.empty());

    assertThrows(RoleNotFoundException.class, () -> roleService.deleteRole(99L));

    verify(roleRepository, never()).delete(any());
  }

}
