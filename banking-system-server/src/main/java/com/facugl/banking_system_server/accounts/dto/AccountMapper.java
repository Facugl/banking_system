package com.facugl.banking_system_server.accounts.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.persistence.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "accountNumber", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    Account toEntity(AccountCreateRequest request);

    @Mapping(source = "owner.username", target = "owner")
    AccountResponse toResponse(Account account);

}
