package com.facugl.banking_system_server.admin.roles.dto.request;

import jakarta.validation.constraints.NotBlank;
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

    @Size(min = 4, message = "The name must have at least 4 characters.")
    @NotBlank(message = "The name cannot be blank.")
    private String name;

}
