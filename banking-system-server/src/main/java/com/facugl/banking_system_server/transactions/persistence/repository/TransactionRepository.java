package com.facugl.banking_system_server.transactions.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    boolean existsByTransactionNumber(String transactionNumber);

    Optional<Transaction> findByTransactionNumber(String transactionNumber);

    @Query("SELECT t FROM Transaction t WHERE t.sourceAccount IN :accounts OR t.targetAccount IN :accounts")
    List<Transaction> findBySourceOrTargetAccounts(@Param("accounts") List<Account> accounts);

    @Query("SELECT t.type, COUNT(t) FROM Transaction t GROUP BY t.type")
    List<Object[]> countByType();

}
