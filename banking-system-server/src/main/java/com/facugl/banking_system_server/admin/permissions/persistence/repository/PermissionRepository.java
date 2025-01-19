package com.facugl.banking_system_server.admin.permissions.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.facugl.banking_system_server.admin.permissions.persistence.entity.GrantedPermission;

public interface PermissionRepository extends JpaRepository<GrantedPermission, Long> {

    @Modifying
    @Query("DELETE FROM GrantedPermission gp WHERE gp.operation.id = :operationId")
    void deleteByOperationId(@Param("operationId") Long operationId);

}
