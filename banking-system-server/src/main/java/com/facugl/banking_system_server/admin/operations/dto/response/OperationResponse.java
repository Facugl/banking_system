package com.facugl.banking_system_server.admin.operations.dto.response;

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
public class OperationResponse {

    private Long id;

    private String name;

    private String path;

    private String httpMethod;

    private boolean permitAll;

    private String moduleName;

}
