package com.facugl.banking_system_server.admin.roles.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.admin.roles.persistence.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    boolean existsByName(String name);

    Optional<Role> findByName(String defaultRole);

}
