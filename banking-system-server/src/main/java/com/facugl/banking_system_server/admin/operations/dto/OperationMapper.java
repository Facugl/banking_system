package com.facugl.banking_system_server.admin.operations.dto;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;

@Mapper(componentModel = "spring")
public interface OperationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "request.name", target = "name")
    @Mapping(source = "request.path", target = "path")
    @Mapping(source = "request.httpMethod", target = "httpMethod")
    @Mapping(source = "request.permitAll", target = "permitAll")
    @Mapping(source = "moduleId", target = "module", qualifiedByName = "mapModule")
    Operation toEntity(OperationCreateRequest request, @Context OperationMapperHelper helper);

    @Mapping(source = "module", target = "moduleName", qualifiedByName = "mapModuleName")
    OperationResponse toResponse(Operation operation, @Context OperationMapperHelper helper);

    @Named("mapModule")
    default Module mapModule(Long id, @Context OperationMapperHelper helper) {
        return helper.mapModule(id);
    }

    @Named("mapModuleName")
    default String mapModuleName(Module module, @Context OperationMapperHelper helper) {
        return helper.mapModuleName(module);
    }

}
