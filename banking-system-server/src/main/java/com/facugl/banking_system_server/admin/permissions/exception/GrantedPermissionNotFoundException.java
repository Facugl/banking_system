package com.facugl.banking_system_server.admin.permissions.exception;

public class GrantedPermissionNotFoundException extends RuntimeException {

    public GrantedPermissionNotFoundException(Long id) {
        super("Permission with ID: '" + id + "' was not found.");
    }

}
