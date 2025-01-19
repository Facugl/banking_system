package com.facugl.banking_system_server.admin.operations.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.modules.persistence.entity.Module;
import com.facugl.banking_system_server.admin.modules.persistence.repository.ModuleRepository;
import com.facugl.banking_system_server.admin.operations.dto.OperationMapper;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationUpdateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.exception.OperationNotFoundException;
import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.admin.permissions.persistence.repository.PermissionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OperationServiceImpl implements OperationService {

    private final ModuleRepository moduleRepository;
    private final OperationRepository operationRepository;
    private final PermissionRepository permissionRepository;
    private final OperationMapper operationMapper;

    @Override
    @Transactional
    public OperationResponse createOperation(OperationCreateRequest request) {
        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() -> new ModuleNotFoundException(request.getModuleId()));

        Operation operation = operationMapper.toEntity(request, module);

        Operation savedOperation = operationRepository.save(operation);

        return operationMapper.toResponse(savedOperation);
    }

    @Override
    @Transactional(readOnly = true)
    public OperationResponse getOperation(Long operationId) {
        Operation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new OperationNotFoundException(operationId));

        return operationMapper.toResponse(operation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationResponse> getAllOperations() {
        return operationRepository.findAll()
                .stream()
                .map(operationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OperationResponse updateOperation(OperationUpdateRequest request, Long operationId) {
        Operation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new OperationNotFoundException(operationId));

        if (request.getName() != null) {
            operation.setName(request.getName());
        }

        if (request.getPath() != null) {
            operation.setPath(request.getPath());
        }

        if (request.getHttpMethod() != null) {
            operation.setHttpMethod(request.getHttpMethod());
        }

        if (request.getPermitAll() != null) {
            operation.setPermitAll(request.getPermitAll());
        }

        if (request.getModuleId() != null) {
            Module module = moduleRepository.findById(request.getModuleId())
                    .orElseThrow(() -> new ModuleNotFoundException(request.getModuleId()));

            operation.setModule(module);
        }

        Operation updatedOperation = operationRepository.save(operation);

        return operationMapper.toResponse(updatedOperation);
    }

    @Override
    @Transactional
    public void deleteOperation(Long operationId) {
        Operation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new OperationNotFoundException(operationId));

        permissionRepository.deleteByOperationId(operationId);

        operationRepository.delete(operation);
    }

}
