import { useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Permission, ROLES } from '../../../utils/constants';
import { Profile } from '../../customer/types';

interface UsePermissionsReturn {
  has: (permission: Permission) => boolean;
  hasAny: (permissions: Permission[]) => boolean;
  hasAll: (permissions: Permission[]) => boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  isCustomer: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { authorities = [], role } = useAppSelector(
    (state) => (state.customer.profile as Profile) || null,
  );

  const permissionsSet = useMemo(() => new Set(authorities), [authorities]);

  const has = (permission: Permission) => permissionsSet.has(permission);

  const hasAny = (permissions: Permission[]) =>
    permissions.some((p) => permissionsSet.has(p));

  const hasAll = (permissions: Permission[]) =>
    permissions.every((p) => permissionsSet.has(p));

  return {
    has,
    hasAny,
    hasAll,
    isAdmin: role === ROLES.ADMINISTRATOR,
    isEmployee: role === ROLES.EMPLOYEE,
    isCustomer: role === ROLES.CUSTOMER,
  };
};
