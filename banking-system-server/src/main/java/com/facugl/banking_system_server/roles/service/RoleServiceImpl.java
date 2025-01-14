package com.facugl.banking_system_server.roles.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.facugl.banking_system_server.roles.persistence.entity.Role;
import com.facugl.banking_system_server.roles.persistence.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    @Value("${security.default.role}")
    private String defaultRole;

    private final RoleRepository roleRepository;

    @Override
    public Optional<Role> findDefaultRole() {
        return roleRepository.findByName(defaultRole);
    }

}
