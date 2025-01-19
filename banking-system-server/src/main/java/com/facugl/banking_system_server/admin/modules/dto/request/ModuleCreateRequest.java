package com.facugl.banking_system_server.admin.modules.dto.request;

import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "The name cannot be null.")
    private String name;

    @NotNull(message = "The base path cannot be null.")
    private String basePath;

}
