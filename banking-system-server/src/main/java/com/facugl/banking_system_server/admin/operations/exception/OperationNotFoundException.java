package com.facugl.banking_system_server.admin.operations.exception;

public class OperationNotFoundException extends RuntimeException {

    public OperationNotFoundException(Long operationId) {
        super("Operation with ID: '" + operationId + "' was not found.");
    }

    public OperationNotFoundException(String operationName) {
        super("Operation with name: '" + operationName + "' was not found.");
    }

}
