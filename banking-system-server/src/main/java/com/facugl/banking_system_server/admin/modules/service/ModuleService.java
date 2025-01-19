package com.facugl.banking_system_server.admin.modules.service;

import java.util.List;

import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleUpdateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;

public interface ModuleService {

    ModuleResponse createModule(ModuleCreateRequest request);

    ModuleResponse getModuleById(Long id);

    List<ModuleResponse> getAllModules();

    ModuleResponse updateModule(Long id, ModuleUpdateRequest request);

    void deleteModule(Long id);

}
