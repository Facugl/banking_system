package com.facugl.banking_system_server.admin.statistics.dto.response;

import java.time.LocalDate;

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
public class AccountGrowthResponse {

    private LocalDate date;

    private Long totalAccounts;

    private Long dailyGrowth;

    private Double growthPercentage;

    private Long cumulativeTotal;

}
