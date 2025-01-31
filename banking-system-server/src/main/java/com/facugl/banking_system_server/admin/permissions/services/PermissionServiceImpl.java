package com.facugl.banking_system_server.admin.permissions.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.admin.permissions.dto.GrantedPermissionMapper;
import com.facugl.banking_system_server.admin.permissions.dto.GrantedPermissionMapperHelper;
import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.exception.GrantedPermissionNotFoundException;
import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;
import com.facugl.banking_system_server.admin.permissions.persistence.repository.PermissionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;
    private final GrantedPermissionMapper permissionMapper;
    private final GrantedPermissionMapperHelper permissionMapperHelper;

    @Override
    @Transactional
    public PermissionResponse createPermission(PermissionRequest request) {
        GrantedPermission permission = permissionMapper.toEntity(request, permissionMapperHelper);

        GrantedPermission savedPermission = permissionRepository.save(permission);

        return permissionMapper.toResponse(savedPermission, permissionMapperHelper);
    }

    @Override
    @Transactional(readOnly = true)
    public PermissionResponse getPermissionById(Long id) {
        GrantedPermission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new GrantedPermissionNotFoundException(id));

        return permissionMapper.toResponse(permission, permissionMapperHelper);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PermissionResponse> getAllPermissions() {
        return permissionRepository.findAll()
                .stream()
                .map(permission -> permissionMapper.toResponse(permission, permissionMapperHelper))
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
