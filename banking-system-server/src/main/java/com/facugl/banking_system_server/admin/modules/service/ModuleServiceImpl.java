package com.facugl.banking_system_server.admin.modules.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.admin.modules.dto.ModuleMapper;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleUpdateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;
import com.facugl.banking_system_server.admin.modules.exception.ModuleAlreadyExistsException;
import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.modules.persistence.repository.ModuleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;

    @Override
    @Transactional
    public ModuleResponse createModule(ModuleCreateRequest request) {
        if (moduleRepository.existsByName(request.getName())) {
            throw new ModuleAlreadyExistsException(request.getName());
        }

        Module module = moduleMapper.toEntity(request);
        module.setBasePath("/".concat(module.getBasePath()));

        Module savedModule = moduleRepository.save(module);

        return moduleMapper.toResponse(savedModule);
    }

    @Override
    @Transactional(readOnly = true)
    public ModuleResponse getModuleById(Long id) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(id));

        return moduleMapper.toResponse(module);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ModuleResponse> getAllModules() {
        return moduleRepository.findAll()
                .stream()
                .map(moduleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModuleResponse updateModule(Long id, ModuleUpdateRequest request) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(id));

        if (request.getName() != null) {
            module.setName(request.getName());
        }

        if (request.getBasePath() != null) {
            module.setBasePath(request.getBasePath());
        }

        Module updatedModule = moduleRepository.save(module);

        return moduleMapper.toResponse(updatedModule);
    }

    @Override
    @Transactional
    public void deleteModule(Long id) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(id));

        moduleRepository.delete(module);
    }

}
