package com.facugl.banking_system_server.admin.roles.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.admin.roles.dto.request.RoleRequest;
import com.facugl.banking_system_server.admin.roles.dto.response.RoleResponse;
import com.facugl.banking_system_server.admin.roles.service.RoleServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/roles")
@RestController
public class RoleController {

    private final RoleServiceImpl roleService;

    @PostMapping
    public ResponseEntity<RoleResponse> createRole(@Valid @RequestBody RoleRequest request) {
        RoleResponse savedRole = roleService.createRole(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedRole);
    }

    @GetMapping("/{role-id}")
    public ResponseEntity<RoleResponse> getRole(@PathVariable(name = "role-id") Long roleId) {
        RoleResponse role = roleService.getRole(roleId);

        return ResponseEntity.status(HttpStatus.OK).body(role);
    }

    @GetMapping
    public ResponseEntity<List<RoleResponse>> getAllRoles() {
        List<RoleResponse> roles = roleService.getAllRoles();

        if (roles.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(roles);
    }

    @PutMapping("/{role-id}")
    public ResponseEntity<RoleResponse> updateRole(
            @PathVariable(name = "role-id") Long roleId,
            @Valid @RequestBody RoleRequest request) {
        RoleResponse updatedRole = roleService.updateRole(request, roleId);

        return ResponseEntity.status(HttpStatus.OK).body(updatedRole);
    }

    @DeleteMapping("/{role-id}")
    public ResponseEntity<Void> deleteRole(@PathVariable(name = "role-id") Long roleId) {
        roleService.deleteRole(roleId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
