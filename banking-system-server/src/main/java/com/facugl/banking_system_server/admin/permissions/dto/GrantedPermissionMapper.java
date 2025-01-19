package com.facugl.banking_system_server.admin.permissions.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;

@Mapper(componentModel = "spring")
public interface GrantedPermissionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "role", target = "role.name")
    @Mapping(source = "operation", target = "operation.name")
    GrantedPermission toEntity(PermissionRequest request);

    @Mapping(source = "operation.name", target = "operation")
    @Mapping(source = "operation.module.name", target = "module")
    @Mapping(source = "role.name", target = "role")
    PermissionResponse toResponse(GrantedPermission permission);

}
