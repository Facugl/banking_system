package com.facugl.banking_system_server.admin.roles.exception;

public class RoleAlreadyExistsException extends RuntimeException {

    public RoleAlreadyExistsException(String roleName) {
        super("Role with name: '" + roleName + "' already exists.");
    }

}
