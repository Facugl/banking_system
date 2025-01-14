package com.facugl.banking_system_server.roles.exceptions;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException() {
        super("Role not found. Default Role.");
    }
}
