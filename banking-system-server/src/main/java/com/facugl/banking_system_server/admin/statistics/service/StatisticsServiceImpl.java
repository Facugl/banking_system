package com.facugl.banking_system_server.admin.statistics.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.facugl.banking_system_server.accounts.persistence.repository.AccountRepository;
import com.facugl.banking_system_server.admin.statistics.dto.response.AccountGrowthResponse;
import com.facugl.banking_system_server.admin.statistics.dto.response.StatisticsResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.TransactionType;
import com.facugl.banking_system_server.transactions.persistence.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StatisticsServiceImpl implements StatisticsService {

	private final AccountRepository accountRepository;
	private final TransactionRepository transactionRepository;

	@Override
	@Transactional(readOnly = true)
	public StatisticsResponse getStatistics() {
		Long totalAccounts = accountRepository.count();
		BigDecimal totalBalance = accountRepository.sumTotalBalance();
		Long totalTransactions = transactionRepository.count();

		Map<TransactionType, Long> transactionsByType = transformTransactionsByType(
				transactionRepository.countByType());

		List<AccountGrowthResponse> accountGrowth = calculateAccountGrowth();

		Map<String, BigDecimal> averageBalanceByAccountType = transformAverageBalanceByAccountType(
				accountRepository.getAverageBalanceByAccountType());

		return StatisticsResponse.builder()
				.totalAccounts(totalAccounts)
				.totalTransactions(totalTransactions)
				.totalBalance(totalBalance)
				.transactionsByType(transactionsByType)
				.accountGrowth(accountGrowth)
				.averageBalanceByAccountType(averageBalanceByAccountType)
				.build();
	}

	private Map<TransactionType, Long> transformTransactionsByType(List<Object[]> rawData) {
		return rawData.stream()
				.collect(Collectors.toMap(
						result -> (TransactionType) result[0],
						result -> (Long) result[1]));
	}

	public List<AccountGrowthResponse> calculateAccountGrowth() {
		List<Object[]> rawResults = accountRepository.getDailyAccountCounts();
		List<AccountGrowthResponse> responses = new ArrayList<>();

		long cumulativeTotal = 0;

		for (Object[] result : rawResults) {
			java.sql.Date sqlDate = (java.sql.Date) result[0];
			LocalDate date = sqlDate.toLocalDate();

			long dailyTotal = ((Number) result[1]).longValue();

			long dailyGrowth = dailyTotal;

			double growthPercentage = (cumulativeTotal > 0)
					? ((double) dailyGrowth / cumulativeTotal) * 100
					: 0;

			cumulativeTotal += dailyTotal;

			responses.add(new AccountGrowthResponse(
					date,
					dailyTotal,
					dailyGrowth,
					Math.round(growthPercentage * 100.0) / 100.0,
					cumulativeTotal));
		}

		return responses;
	}

	private Map<String, BigDecimal> transformAverageBalanceByAccountType(List<Object[]> rawData) {
		return rawData.stream()
				.collect(Collectors.toMap(
						result -> (String) result[0],
						result -> BigDecimal.valueOf((Double) result[1])));
	}

}