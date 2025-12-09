package com.facugl.banking_system_server.admin.operations.dto.request;

import jakarta.validation.constraints.Min;
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

    @Size(min = 3, max = 100, message = "The name must be between 3 and 100 characters.")
    private String name;

    @Pattern(
            regexp = "^/.*$",
            message = "The path must start with '/'."
    )
    private String path;

    @Pattern(regexp = "^(GET|POST|PUT|DELETE|PATCH)$", message = "The HTTP method must be one of GET, POST, PUT, DELETE, PATCH.")
    private String httpMethod;

    private Boolean permitAll;

    @Min(value = 1, message = "The module ID must be greater than or equal to 1.")
    private Long moduleId;

}
