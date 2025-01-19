package com.facugl.banking_system_server.admin.permissions.services;

import java.util.List;

import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;

public interface PermissionService {

    PermissionResponse createPermission(PermissionRequest request);

    PermissionResponse getPermissionById(Long id);

    List<PermissionResponse> getAllPermissions();

    void deletePermission(Long id);

}
