package com.facugl.banking_system_server.accounts.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class TransferRequest {

    @Pattern(regexp = "^[0-9]{10,20}$", message = "Account number must be a valid number with 10 to 20 digits.")
    @NotBlank(message = "Target account number is required.")
    private String targetAccountNumber;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Transfer amount must be greater than zero.")
    private BigDecimal amount;

    @Size(max = 255, message = "Comment must not exceed 255 characters.")
    private String comment;

}
