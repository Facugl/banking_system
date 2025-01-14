package com.facugl.banking_system_server.transactions.dto;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.persistence.entity.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(source = "sourceAccount.accountNumber", target = "sourceAccount")
    @Mapping(source = "targetAccount.accountNumber", target = "targetAccount")
    TransactionResponse toResponse(Transaction transaction);

    List<TransactionResponse> toResponseList(List<Transaction> transactions);

}
