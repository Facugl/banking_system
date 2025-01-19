package com.facugl.banking_system_server.admin.modules.exception;

public class ModuleNotFoundException extends RuntimeException {

    public ModuleNotFoundException(Long id) {
        super("Account with ID: '" + id + "' was not found.");
    }

}
