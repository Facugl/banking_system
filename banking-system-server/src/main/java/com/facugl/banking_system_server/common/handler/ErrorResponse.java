package com.facugl.banking_system_server.common.handler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private String frontendMessage;

    private String backendMessage;

    private int status;

    private String path;

    private String timestamp;

}
