package com.facugl.banking_system_server.accounts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.accounts.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByAccountNumber(String accountNumber);
}
