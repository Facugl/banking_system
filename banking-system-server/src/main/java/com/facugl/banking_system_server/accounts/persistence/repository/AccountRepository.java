package com.facugl.banking_system_server.accounts.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.users.persistence.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {

    boolean existsByAccountNumber(String accountNumber);

    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findByOwner(User owner);

}
