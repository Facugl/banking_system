package com.facugl.banking_system_server.users.dto.response;

import java.util.List;

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
public class LoggedInUserResponse {

    private Long id;

    private String username;

    private String name;

    private String role;

    private List<String> authorities;

}
