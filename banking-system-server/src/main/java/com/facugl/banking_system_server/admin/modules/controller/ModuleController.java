package com.facugl.banking_system_server.admin.modules.controller;

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

import com.facugl.banking_system_server.admin.modules.dto.request.ModuleCreateRequest;
import com.facugl.banking_system_server.admin.modules.dto.request.ModuleUpdateRequest;
import com.facugl.banking_system_server.admin.modules.dto.response.ModuleResponse;
import com.facugl.banking_system_server.admin.modules.service.ModuleServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/modules")
@RestController
public class ModuleController {

    private final ModuleServiceImpl moduleService;

    @PostMapping
    public ResponseEntity<ModuleResponse> createModule(@Valid @RequestBody ModuleCreateRequest request) {
        ModuleResponse savedModule = moduleService.createModule(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedModule);
    }

    @GetMapping("/{module-id}")
    public ResponseEntity<ModuleResponse> getModule(@PathVariable(name = "module-id") Long moduleId) {
        ModuleResponse module = moduleService.getModuleById(moduleId);

        return ResponseEntity.status(HttpStatus.OK).body(module);
    }

    @GetMapping
    public ResponseEntity<List<ModuleResponse>> getAllModules() {
        List<ModuleResponse> modules = moduleService.getAllModules();

        if (modules.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(modules);
    }

    @PutMapping("/{module-id}")
    public ResponseEntity<ModuleResponse> updateModule(
            @Valid @RequestBody ModuleUpdateRequest request,
            @PathVariable(name = "module-id") Long moduleId) {
        ModuleResponse module = moduleService.updateModule(moduleId, request);

        return ResponseEntity.status(HttpStatus.OK).body(module);
    }

    @DeleteMapping("/{module-id}")
    public ResponseEntity<Void> deleteModule(@PathVariable(name = "module-id") Long moduleId) {
        moduleService.deleteModule(moduleId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
