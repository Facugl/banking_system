import { Routes, ROLES, Role } from './constants';

export const getRedirectPath = (role: Role): string => {
  console.log('getRedirectPath:', { role });
  if (role === ROLES.CUSTOMER) {
    return Routes.CUSTOMER_PANEL;
  } else if ([ROLES.ADMINISTRATOR, ROLES.EMPLOYEE].includes(role)) {
    return Routes.DASHBOARD;
  }
  return Routes.LOGIN; // Default for undefined role
};
