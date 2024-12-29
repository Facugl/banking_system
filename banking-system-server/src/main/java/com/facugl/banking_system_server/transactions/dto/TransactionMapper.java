package com.facugl.banking_system_server.transactions.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.transactions.dto.response.TransactionResponse;
import com.facugl.banking_system_server.transactions.entity.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(source = "accountFrom.id", target = "accountFromId")
    @Mapping(source = "accountTo.id", target = "accountToId")
    TransactionResponse toResponse(Transaction transaction);

}
