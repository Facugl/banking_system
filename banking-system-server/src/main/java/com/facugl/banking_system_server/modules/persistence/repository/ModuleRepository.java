package com.facugl.banking_system_server.modules.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.modules.persistence.entity.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {

}
