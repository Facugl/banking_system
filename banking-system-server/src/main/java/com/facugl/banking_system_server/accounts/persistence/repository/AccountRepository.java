package com.facugl.banking_system_server.accounts.persistence.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.users.persistence.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {

    boolean existsByAccountNumber(String accountNumber);

    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findByOwner(User owner);

    @Query("SELECT SUM(a.balance) FROM Account a")
    BigDecimal sumTotalBalance();

    @Query("SELECT DATE(a.createdAt), COUNT(a) " +
            "FROM Account a " +
            "GROUP BY DATE(a.createdAt) " +
            "ORDER BY DATE(a.createdAt)")
    List<Object[]> getDailyAccountCounts();

    @Query("SELECT a.type, AVG(a.balance) FROM Account a GROUP BY a.type")
    List<Object[]> getAverageBalanceByAccountType();

}
