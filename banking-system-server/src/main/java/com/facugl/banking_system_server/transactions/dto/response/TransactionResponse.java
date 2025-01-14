package com.facugl.banking_system_server.transactions.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;

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
public class TransactionResponse {

    private Long id;

    private String transactionNumber;

    private String sourceAccount;

    private String targetAccount;

    private BigDecimal amount;

    private LocalDateTime transactionDate;

    private TransactionType type;

    private String comment;

}
