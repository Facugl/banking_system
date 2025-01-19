package com.facugl.banking_system_server.admin.roles.service;

import java.util.List;
import java.util.Optional;

import com.facugl.banking_system_server.admin.roles.dto.request.RoleRequest;
import com.facugl.banking_system_server.admin.roles.dto.response.RoleResponse;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;

public interface RoleService {

    RoleResponse createRole(RoleRequest request);

    RoleResponse getRole(Long roleId);

    List<RoleResponse> getAllRoles();

    Optional<Role> findDefaultRole();

    RoleResponse updateRole(RoleRequest request, Long roleId);

    void deleteRole(Long roleId);

}
