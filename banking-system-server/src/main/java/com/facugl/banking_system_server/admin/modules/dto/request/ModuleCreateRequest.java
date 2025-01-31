package com.facugl.banking_system_server.admin.modules.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ModuleCreateRequest {

    @NotBlank(message = "The name cannot be blank.")
    private String name;

    @NotBlank(message = "The base path cannot be blank.")
    private String basePath;

}
