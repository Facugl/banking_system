package com.facugl.banking_system_server.admin.modules.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;

@Mapper(componentModel = "spring")
public interface ModuleMapper {

    @Mapping(target = "id", ignore = true)
    Module toEntity(ModuleCreateRequest request);

    ModuleResponse toResponse(Module module);

}
