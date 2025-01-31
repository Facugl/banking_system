package com.facugl.banking_system_server.admin.permissions.dto.request;

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
public class PermissionRequest {

    @NotBlank(message = "The role cannot be blank.")
    private String role;

    @NotBlank(message = "The operation cannot be blank.")
    private String operation;

}
