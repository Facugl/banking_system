package com.facugl.banking_system_server.admin.permissions.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.admin.permissions.dto.request.PermissionRequest;
import com.facugl.banking_system_server.admin.permissions.dto.response.PermissionResponse;
import com.facugl.banking_system_server.admin.permissions.services.PermissionServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/permissions")
@RestController
public class PermissionController {

    private final PermissionServiceImpl permissionService;

    @PostMapping
    public ResponseEntity<PermissionResponse> createPermission(@Valid @RequestBody PermissionRequest request) {
        PermissionResponse savedPermission = permissionService.createPermission(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPermission);
    }

    @GetMapping("/{permission-id}")
    public ResponseEntity<PermissionResponse> getPermission(@PathVariable(name = "permission-id") Long permissionId) {
        PermissionResponse permission = permissionService.getPermissionById(permissionId);

        return ResponseEntity.status(HttpStatus.OK).body(permission);
    }

    @GetMapping
    public ResponseEntity<List<PermissionResponse>> getPermissions() {
        List<PermissionResponse> permissions = permissionService.getAllPermissions();

        if (permissions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(permissions);
    }

    @DeleteMapping("/{permission-id}")
    public ResponseEntity<PermissionResponse> deletePermission(
            @PathVariable(name = "permission-id") Long permissionId) {
        permissionService.deletePermission(permissionId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
