package com.facugl.banking_system_server.admin.roles.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RoleRequest {

    @Size(min = 4, message = "Role name must have at least 4 characters.")
    @NotNull(message = "Role name cannot be null.")
    private String name;

}
