package com.facugl.banking_system_server.admin.permissions.dto;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;

@Mapper(componentModel = "spring")
public interface GrantedPermissionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "role", target = "role", qualifiedByName = "mapRole")
    @Mapping(source = "operation", target = "operation", qualifiedByName = "mapOperation")
    GrantedPermission toEntity(PermissionRequest request, @Context GrantedPermissionMapperHelper helper);

    @Mapping(source = "operation", target = "operation", qualifiedByName = "mapOperationName")
    @Mapping(source = "operation.module.name", target = "module")
    @Mapping(source = "role", target = "role", qualifiedByName = "mapRoleName")
    PermissionResponse toResponse(GrantedPermission permission, @Context GrantedPermissionMapperHelper helper);

    @Named("mapRole")
    default Role mapRole(String roleName, @Context GrantedPermissionMapperHelper helper) {
        return helper.mapRole(roleName);
    }

    @Named("mapRoleName")
    default String mapRoleName(Role role, @Context GrantedPermissionMapperHelper helper) {
        return helper.mapRoleName(role);
    }

    @Named("mapOperation")
    default Operation mapOperation(String operationName, @Context GrantedPermissionMapperHelper helper) {
        return helper.mapOperation(operationName);
    }

    @Named("mapOperationName")
    default String mapOperationName(Operation operation, @Context GrantedPermissionMapperHelper helper) {
        return helper.mapOperationName(operation);
    }

}
