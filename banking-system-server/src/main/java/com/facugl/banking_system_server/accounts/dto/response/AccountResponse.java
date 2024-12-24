package com.facugl.banking_system_server.accounts.dto.response;

import java.math.BigDecimal;

import com.facugl.banking_system_server.accounts.entity.AccountType;

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

}
