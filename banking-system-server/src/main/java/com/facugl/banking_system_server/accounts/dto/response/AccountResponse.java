package com.facugl.banking_system_server.accounts.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.facugl.banking_system_server.accounts.persistence.entity.AccountStatus;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountType;

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
public class AccountResponse {

    private Long id;

    private String accountNumber;

    private AccountType type;

    private BigDecimal balance;

    private AccountStatus status;

    private String owner;

    private LocalDateTime createdAt;

}
