package com.facugl.banking_system_server.admin.permissions.dto;

import com.facugl.banking_system_server.admin.operations.exception.OperationNotFoundException;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.admin.roles.exception.RoleNotFoundException;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.admin.roles.persistence.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GrantedPermissionMapperHelperTest {

  @Mock
  private RoleRepository roleRepository;

  @Mock
  private OperationRepository operationRepository;

  @InjectMocks
  private GrantedPermissionMapperHelper helper;

  @Test
  void mapRole_shouldReturnRoleWhenNameExists() {
    Role role = new Role();
    role.setName("CUSTOMER");

    when(roleRepository.findByName("CUSTOMER")).thenReturn(Optional.of(role));

    assertSame(role, helper.mapRole("CUSTOMER"));
  }

  @Test
  void mapRole_shouldThrowWhenNameDoesNotExist() {
    when(roleRepository.findByName("UNKNOWN")).thenReturn(Optional.empty());

    assertThrows(RoleNotFoundException.class, () -> helper.mapRole("UNKNOWN"));
  }

  @Test
  void mapRoleName_shouldReturnRoleName() {
    Role role = new Role();
    role.setName("CUSTOMER");

    assertEquals("CUSTOMER", helper.mapRoleName(role));
  }

  @Test
  void mapOperation_shouldReturnOperationWhenNameExists() {
    Operation operation = new Operation();
    operation.setName("READ_ONE_ACCOUNT");

    when(operationRepository.findByName("READ_ONE_ACCOUNT")).thenReturn(Optional.of(operation));

    assertSame(operation, helper.mapOperation("READ_ONE_ACCOUNT"));
  }

  @Test
  void mapOperation_shouldThrowWhenNameDoesNotExist() {
    when(operationRepository.findByName("UNKNOWN")).thenReturn(Optional.empty());

    assertThrows(OperationNotFoundException.class, () -> helper.mapOperation("UNKNOWN"));
  }

  @Test
  void mapOperationName_shouldReturnOperationName() {
    Operation operation = new Operation();
    operation.setName("READ_ONE_ACCOUNT");

    assertEquals("READ_ONE_ACCOUNT", helper.mapOperationName(operation));
  }

}
