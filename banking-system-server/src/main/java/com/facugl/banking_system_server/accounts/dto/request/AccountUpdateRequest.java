package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import com.facugl.banking_system_server.accounts.entity.AccountType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
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
public class AccountUpdateRequest {

    @Size(min = 10, max = 20, message = "The account number must be between 10 and 20 characters")
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    @Min(value = 0, message = "The balance must be greater than or equal to 0")
    private BigDecimal balance;

}
