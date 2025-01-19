package com.facugl.banking_system_server.admin.operations.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;

@Mapper(componentModel = "spring")
public interface OperationMapper {

    @Mapping(source = "request.name", target = "name")
    @Mapping(source = "request.path", target = "path")
    @Mapping(source = "request.httpMethod", target = "httpMethod")
    @Mapping(source = "request.permitAll", target = "permitAll")
    @Mapping(source = "module", target = "module")
    Operation toEntity(OperationCreateRequest request, Module module);

    @Mapping(source = "operation.id", target = "id")
    @Mapping(source = "operation.name", target = "name")
    @Mapping(source = "operation.path", target = "path")
    @Mapping(source = "operation.httpMethod", target = "httpMethod")
    @Mapping(source = "operation.permitAll", target = "permitAll")
    @Mapping(source = "operation.module.name", target = "moduleName")
    OperationResponse toResponse(Operation operation);

}
