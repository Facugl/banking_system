package com.facugl.banking_system_server.transactions.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.facugl.banking_system_server.transactions.entity.TransactionType;

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
public class TransactionResponse {

    private Long id;

    private Long accountFromId;

    private Long accountToId;

    private BigDecimal amount;

    private LocalDateTime transactionDate;

    private TransactionType type;

}
