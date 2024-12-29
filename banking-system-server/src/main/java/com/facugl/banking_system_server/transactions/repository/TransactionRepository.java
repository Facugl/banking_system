package com.facugl.banking_system_server.transactions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.transactions.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
