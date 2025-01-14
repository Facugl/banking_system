package com.facugl.banking_system_server.roles.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.roles.persistence.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String defaultRole);

}
