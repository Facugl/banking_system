package com.facugl.banking_system_server.accounts.dto.request;

import com.facugl.banking_system_server.accounts.persistence.entity.AccountStatus;
import com.facugl.banking_system_server.common.validation.EnumValidator;

import jakarta.validation.constraints.NotNull;
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
public class AccountStatusRequest {

    @NotNull(message = "The account status cannot be null.")
    @EnumValidator(enumClass = AccountStatus.class, message = "Invalid status. Allowed values are: ACTIVE, INACTIVE, BLOCKED, CLOSED.")
    private String status;

}
