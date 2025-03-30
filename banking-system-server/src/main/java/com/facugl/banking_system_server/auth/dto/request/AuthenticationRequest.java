package com.facugl.banking_system_server.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
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
public class AuthenticationRequest {

    @NotBlank(message = "The username cannot be blank.")
    private String username;

    @NotBlank(message = "The password cannot be blank.")
    private String password;

}
