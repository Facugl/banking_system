package com.facugl.banking_system_server.admin.permissions.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.admin.operations.exception.OperationNotFoundException;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.admin.permissions.dto.GrantedPermissionMapper;
import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.exception.GrantedPermissionNotFoundException;
import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;
import com.facugl.banking_system_server.admin.permissions.persistence.repository.PermissionRepository;
import com.facugl.banking_system_server.admin.roles.exception.RoleNotFoundException;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;
import com.facugl.banking_system_server.admin.roles.persistence.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final OperationRepository operationRepository;
    private final GrantedPermissionMapper permissionMapper;

    @Override
    @Transactional
    public PermissionResponse createPermission(PermissionRequest request) {
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new RoleNotFoundException(request.getRole()));

        Operation operation = operationRepository.findByName(request.getOperation())
                .orElseThrow(() -> new OperationNotFoundException(request.getOperation()));

        GrantedPermission permission = permissionMapper.toEntity(request);
        permission.setRole(role);
        permission.setOperation(operation);

        GrantedPermission savedPermission = permissionRepository.save(permission);

        return permissionMapper.toResponse(savedPermission);
    }

    @Override
    @Transactional(readOnly = true)
    public PermissionResponse getPermissionById(Long id) {
        GrantedPermission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new GrantedPermissionNotFoundException(id));

        return permissionMapper.toResponse(permission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PermissionResponse> getAllPermissions() {
        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deletePermission(Long id) {
        GrantedPermission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new GrantedPermissionNotFoundException(id));

        permissionRepository.delete(permission);
    }

}
