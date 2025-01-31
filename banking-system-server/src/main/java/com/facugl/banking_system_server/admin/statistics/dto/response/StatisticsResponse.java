package com.facugl.banking_system_server.admin.statistics.dto.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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

    private Map<String, Long> transactionsByType;

    private List<AccountGrowthResponse> accountGrowth;

    private Map<String, BigDecimal> averageBalanceByAccountType;

}
