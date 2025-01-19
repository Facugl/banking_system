package com.facugl.banking_system_server.admin.permissions.dto.request;

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
public class PermissionRequest {

    @NotNull(message = "The role cannot be null.")
    private String role;

    @NotNull(message = "The operation cannot be null.")
    private String operation;
}
