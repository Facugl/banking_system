package com.facugl.banking_system_server.users.dto.request;

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
public class CustomerRequest {

    @Size(min = 4)
    private String name;

    private String username;

    @Size(min = 8)
    private String password;

    @Size(min = 8)
    private String repeatedPassword;

}
