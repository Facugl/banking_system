package com.facugl.banking_system_server.users.util;

import java.util.Arrays;
import java.util.List;

public enum RoleEnum {

    ADMINISTRATOR(Arrays.asList(
            RolePermissionEnum.CREATE_ONE_ACCOUNT,
            RolePermissionEnum.GET_ONE_ACCOUNT,
            RolePermissionEnum.GET_ALL_ACCOUNTS,
            RolePermissionEnum.UPDATE_ONE_ACCOUNT,
            RolePermissionEnum.DELETE_ONE_ACCOUNT,
            RolePermissionEnum.DEPOSIT_INTO_ACCOUNT,
            RolePermissionEnum.WITHDRAW_FROM_ACCOUNT,
            RolePermissionEnum.TRANSFER_BETWEEN_ACCOUNTS,
            RolePermissionEnum.CHECK_ACCOUNT_BALANCE,
            RolePermissionEnum.GET_ALL_TRANSACTIONS,
            RolePermissionEnum.READ_MY_PROFILE)),

    EMPLOYEE(Arrays.asList(
            RolePermissionEnum.CREATE_ONE_ACCOUNT,
            RolePermissionEnum.GET_ONE_ACCOUNT,
            RolePermissionEnum.GET_ALL_ACCOUNTS,
            RolePermissionEnum.UPDATE_ONE_ACCOUNT,
            RolePermissionEnum.DEPOSIT_INTO_ACCOUNT,
            RolePermissionEnum.WITHDRAW_FROM_ACCOUNT,
            RolePermissionEnum.TRANSFER_BETWEEN_ACCOUNTS,
            RolePermissionEnum.CHECK_ACCOUNT_BALANCE,
            RolePermissionEnum.GET_ALL_TRANSACTIONS,
            RolePermissionEnum.READ_MY_PROFILE)),

    CUSTOMER(Arrays.asList(
            RolePermissionEnum.CREATE_ONE_ACCOUNT,
            RolePermissionEnum.GET_ONE_ACCOUNT,
            RolePermissionEnum.GET_OWN_ACCOUNTS,
            RolePermissionEnum.UPDATE_ACCOUNT_STATUS,
            RolePermissionEnum.DEPOSIT_INTO_ACCOUNT,
            RolePermissionEnum.WITHDRAW_FROM_ACCOUNT,
            RolePermissionEnum.TRANSFER_BETWEEN_ACCOUNTS,
            RolePermissionEnum.CHECK_ACCOUNT_BALANCE,
            RolePermissionEnum.GET_OWN_TRANSACTIONS,
            RolePermissionEnum.READ_MY_PROFILE));

    private List<RolePermissionEnum> permissions;

    private RoleEnum(List<RolePermissionEnum> permissions) {
        this.permissions = permissions;
    }

    public List<RolePermissionEnum> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<RolePermissionEnum> permissions) {
        this.permissions = permissions;
    }

}
