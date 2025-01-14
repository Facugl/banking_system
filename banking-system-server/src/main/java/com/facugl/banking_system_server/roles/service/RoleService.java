package com.facugl.banking_system_server.roles.service;

import java.util.Optional;

import com.facugl.banking_system_server.roles.persistence.entity.Role;

public interface RoleService {

    Optional<Role> findDefaultRole();

}
