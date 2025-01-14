package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import com.facugl.banking_system_server.accounts.persistence.entity.AccountType;
import com.facugl.banking_system_server.common.validation.EnumValidator;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "The account type cannot be null.")
    @EnumValidator(enumClass = AccountType.class, message = "Invalid account type. Allowed values are: CHECKING, SAVINGS.")
    private String type;

    @NotNull(message = "The balance cannot be null.")
    @Min(value = 0, message = "The balance must be greater than or equal to 0.")
    private BigDecimal balance;

}
