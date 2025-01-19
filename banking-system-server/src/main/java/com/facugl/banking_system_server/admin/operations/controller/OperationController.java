package com.facugl.banking_system_server.admin.operations.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.admin.operations.dto.request.OperationCreateRequest;
import com.facugl.banking_system_server.admin.operations.dto.request.OperationUpdateRequest;
import com.facugl.banking_system_server.admin.operations.dto.response.OperationResponse;
import com.facugl.banking_system_server.admin.operations.service.OperationServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/operations")
@RestController
public class OperationController {

    private final OperationServiceImpl operationService;

    @PostMapping
    public ResponseEntity<OperationResponse> createOperation(@Valid @RequestBody OperationCreateRequest request) {
        OperationResponse savedOperation = operationService.createOperation(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedOperation);
    }

    @GetMapping("/{operation-id}")
    public ResponseEntity<OperationResponse> getOperation(@PathVariable(name = "operation-id") Long operationId) {
        OperationResponse operation = operationService.getOperation(operationId);

        return ResponseEntity.status(HttpStatus.OK).body(operation);
    }

    @GetMapping
    public ResponseEntity<List<OperationResponse>> getAllOperations() {
        List<OperationResponse> operations = operationService.getAllOperations();

        if (operations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(operations);
    }

    @PutMapping("/{operation-id}")
    public ResponseEntity<OperationResponse> updateOperation(
            @Valid @RequestBody OperationUpdateRequest request,
            @PathVariable(name = "operation-id") Long operationId) {
        OperationResponse updatedOperation = operationService.updateOperation(request, operationId);

        return ResponseEntity.status(HttpStatus.OK).body(updatedOperation);
    }

    @DeleteMapping("/{operation-id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable(name = "operation-id") Long operationId) {
        operationService.deleteOperation(operationId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
