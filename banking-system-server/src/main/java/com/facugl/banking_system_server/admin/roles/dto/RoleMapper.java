package com.facugl.banking_system_server.admin.roles.dto;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;
import com.facugl.banking_system_server.admin.roles.dto.request.RoleRequest;
import com.facugl.banking_system_server.admin.roles.dto.response.RoleResponse;
import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "permissions", ignore = true)
    Role toEntity(RoleRequest request);

    @Mapping(source = "permissions", target = "permissions", qualifiedByName = "mapPermissions")
    RoleResponse toResponse(Role role);

    @Named("mapPermissions")
    default List<String> mapPermissions(List<GrantedPermission> permissions) {
        if (permissions == null) {
            return Collections.emptyList();
        }
        return permissions.stream()
                .map(permission -> permission.getOperation().getName())
                .collect(Collectors.toList());
    }

}
