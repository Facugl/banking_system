package com.facugl.banking_system_server.admin.operations.dto;

import org.springframework.stereotype.Component;

import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.modules.persistence.repository.ModuleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OperationMapperHelper {

    private final ModuleRepository moduleRepository;

    public Module mapModule(Long id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(id));
    }

    public String mapModuleName(Module module) {
        return module.getName();
    }

}
