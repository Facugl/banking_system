package com.facugl.banking_system_server.admin.statistics.dto.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;

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
public class StatisticsResponse {

    private Long totalAccounts;

    private Long totalTransactions;

    private BigDecimal totalBalance;

    private Map<TransactionType, Long> transactionsByType;

    private List<AccountGrowthResponse> accountGrowth;

    private Map<String, BigDecimal> averageBalanceByAccountType;

}
