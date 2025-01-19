package com.facugl.banking_system_server.admin.roles.exception;

public class RoleNotFoundException extends RuntimeException {

    public RoleNotFoundException() {
        super("Role not found. Default Role.");
    }

    public RoleNotFoundException(String roleName) {
        super("Role with name: '" + roleName + "' was not found.");
    }

    public RoleNotFoundException(Long roleId) {
        super("Role with ID: '" + roleId + "' was not found.");
    }

}
