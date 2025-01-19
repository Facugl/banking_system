package com.facugl.banking_system_server.admin.modules.exception;

public class ModuleAlreadyExistsException extends RuntimeException {

    public ModuleAlreadyExistsException(String moduleName) {
        super("Module with name: '" + moduleName + "' already exists.");
    }

}
