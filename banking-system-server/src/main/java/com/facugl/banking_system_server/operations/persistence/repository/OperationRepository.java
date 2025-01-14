package com.facugl.banking_system_server.operations.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.facugl.banking_system_server.operations.persistence.entity.Operation;

public interface OperationRepository extends JpaRepository<Operation, Long> {

    @Query("SELECT o FROM Operation o WHERE o.permitAll = true")
    List<Operation> findByPublicAccess();

}
