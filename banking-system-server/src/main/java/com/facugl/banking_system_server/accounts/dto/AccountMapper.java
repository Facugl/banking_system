package com.facugl.banking_system_server.accounts.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.facugl.banking_system_server.accounts.dto.request.AccountCreateRequest;
import com.facugl.banking_system_server.accounts.dto.response.AccountResponse;
import com.facugl.banking_system_server.accounts.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    @Mapping(target = "id", ignore = true)
    Account toEntity(AccountCreateRequest request);

    AccountResponse toResponse(Account account);

}
