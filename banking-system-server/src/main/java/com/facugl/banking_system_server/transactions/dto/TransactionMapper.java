package com.facugl.banking_system_server.transactions.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.facugl.banking_system_server.accounts.persistence.entity.Account;
import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(source = "sourceAccount", target = "sourceAccount", qualifiedByName = "mapAccountNumber")
    @Mapping(source = "targetAccount", target = "targetAccount", qualifiedByName = "mapAccountNumber")
    TransactionResponse toResponse(Transaction transaction);

    @Named("mapAccountNumber")
    default String mapAccountNumber(Account account) {
        return (account != null) ? account.getAccountNumber() : null;
    }

}
