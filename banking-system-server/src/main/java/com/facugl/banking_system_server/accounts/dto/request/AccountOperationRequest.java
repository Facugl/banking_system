package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class AccountOperationRequest {

    @NotNull(message = "The amount is mandatory.")
    @DecimalMin(value = "0.01", message = "The amount must be greater than zero.")
    private BigDecimal amount;

    @Size(max = 255, message = "The comment must not exceed 255 characters.")
    private String comment;

}
