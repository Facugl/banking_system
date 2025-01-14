package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import com.facugl.banking_system_server.accounts.persistence.entity.AccountStatus;
import com.facugl.banking_system_server.accounts.persistence.entity.AccountType;
import com.facugl.banking_system_server.common.validation.EnumValidator;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountUpdateRequest {

    @EnumValidator(enumClass = AccountType.class, message = "Invalid account type. Allowed values are: CHECKING, SAVINGS.")
    private String type;

    @Min(value = 0, message = "The balance must be greater than or equal to 0.")
    private BigDecimal balance;

    @EnumValidator(enumClass = AccountStatus.class, message = "Invalid status. Allowed values are: ACTIVE, INACTIVE, BLOCKED, CLOSED.")
    private String status;

}
