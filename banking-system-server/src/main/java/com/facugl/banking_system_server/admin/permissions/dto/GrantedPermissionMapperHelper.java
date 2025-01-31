package com.facugl.banking_system_server.admin.permissions.dto;

import org.springframework.stereotype.Component;

import com.facugl.banking_system_server.admin.operations.exception.OperationNotFoundException;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.admin.roles.exception.RoleNotFoundException;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.admin.roles.persistence.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class GrantedPermissionMapperHelper {

    private final RoleRepository roleRepository;
    private final OperationRepository operationRepository;

    public Role mapRole(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException(roleName));
    }

    public String mapRoleName(Role role) {
        return role.getName();
    }

    public Operation mapOperation(String operationName) {
        return operationRepository.findByName(operationName)
                .orElseThrow(() -> new OperationNotFoundException(operationName));
    }

    public String mapOperationName(Operation operation) {
        return operation.getName();
    }

}
