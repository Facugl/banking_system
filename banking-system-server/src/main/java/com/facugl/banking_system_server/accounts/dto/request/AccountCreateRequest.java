package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import com.facugl.banking_system_server.accounts.entity.AccountType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
public class AccountCreateRequest {

    @NotNull(message = "The account number cannot be null")
    @Size(min = 10, max = 20, message = "The account number must be between 10 and 20 characters")
    private String accountNumber;

    @NotNull(message = "The account type cannot be null")
    @Enumerated(EnumType.STRING)
    private AccountType type;

    @NotNull(message = "The balance cannot be null")
    @Min(value = 0, message = "The balance must be greater than or equal to 0")
    private BigDecimal balance;

}
