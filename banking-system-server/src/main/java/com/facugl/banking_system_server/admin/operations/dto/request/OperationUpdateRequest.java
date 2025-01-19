package com.facugl.banking_system_server.admin.operations.dto.request;

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
public class OperationUpdateRequest {

    @Size(min = 3, max = 100, message = "Operation name must be between 3 and 100 characters.")
    private String name;

    @Pattern(regexp = "(^$|/[0-9]*)", message = "The path field must be either an empty string or match the pattern '/[0-9]*' if provided.")
    private String path;

    @Pattern(regexp = "^(GET|POST|PUT|DELETE|PATCH)$", message = "HTTP method must be one of GET, POST, PUT, DELETE, PATCH.")
    private String httpMethod;

    private Boolean permitAll;

    private Long moduleId;

}
