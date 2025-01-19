package com.facugl.banking_system_server.admin.operations.service;

import java.util.List;

import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationUpdateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;

public interface OperationService {

    OperationResponse createOperation(OperationCreateRequest request);

    OperationResponse getOperation(Long operationId);

    List<OperationResponse> getAllOperations();

    OperationResponse updateOperation(OperationUpdateRequest request, Long operationId);

    void deleteOperation(Long operationId);

}
