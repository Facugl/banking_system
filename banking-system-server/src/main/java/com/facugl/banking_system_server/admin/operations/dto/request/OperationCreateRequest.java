package com.facugl.banking_system_server.admin.operations.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class OperationCreateRequest {

    @NotBlank(message = "The name cannot be blank.")
    @Size(min = 3, max = 100, message = "The name must be between 3 and 100 characters.")
    private String name;

    @NotNull(message = "The path cannot be null.")
    @Pattern(
            regexp = "(^$|/\\[0-9]\\*)",
            message = "The path must be '/[0-9]*' or empty."
    )
    private String path;

    @NotBlank(message = "The HTTP method cannot be blank.")
    @Pattern(regexp = "^(get|post|put|delete|patch)$", message = "The HTTP method must be one of get, post, put, delete, patch.")
    private String httpMethod;

    @NotNull(message = "The permitAll flag cannot be null.")
    private Boolean permitAll;

    @Min(value = 1, message = "The module ID must be greater than or equal to 1.")
    @NotNull(message = "The module ID cannot be null.")
    private Long moduleId;

}
