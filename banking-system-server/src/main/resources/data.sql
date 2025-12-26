-- CREACIÓN DE MODULOS
INSERT INTO modules (name, base_path)
SELECT 'ACCOUNT', '/accounts'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'ACCOUNT');
INSERT INTO modules (name, base_path)
SELECT 'TRANSACTION', '/transactions'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'TRANSACTION');
INSERT INTO modules (name, base_path)
SELECT 'USER', '/users'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'USER');
INSERT INTO modules (name, base_path)
SELECT 'AUTH', '/auth'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'AUTH');
INSERT INTO modules (name, base_path)
SELECT 'MODULE', '/modules'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'MODULE');
INSERT INTO modules (name, base_path)
SELECT 'OPERATION', '/operations'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'OPERATION');
INSERT INTO modules (name, base_path)
SELECT 'PERMISSION', '/permissions'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'PERMISSION');
INSERT INTO modules (name, base_path)
SELECT 'ROLE', '/roles'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'ROLE');
INSERT INTO modules (name, base_path)
SELECT 'STATISTICS', '/statistics'
WHERE NOT EXISTS (SELECT 1 FROM modules WHERE name = 'STATISTICS');

-- CREACIÓN DE OPERACIONES
INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CREATE_ONE_ACCOUNT', '', 'POST', false, 1 
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_ACCOUNT', '/[0-9]*', 'GET', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_ACCOUNTS', '', 'GET', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_ACCOUNTS' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'UPDATE_ONE_ACCOUNT', '/[0-9]*', 'PUT', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'UPDATE_ACCOUNT_STATUS', '/[0-9]*/change-status', 'PATCH', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ACCOUNT_STATUS' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DELETE_ONE_ACCOUNT', '/[0-9]*', 'DELETE', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DEPOSIT_INTO_ACCOUNT', '/[0-9]*/deposit', 'POST', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DEPOSIT_INTO_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'WITHDRAW_FROM_ACCOUNT', '/[0-9]*/withdraw', 'POST', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'WITHDRAW_FROM_ACCOUNT' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'TRANSFER_BETWEEN_ACCOUNTS', '/[0-9]*/transfer', 'POST', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'TRANSFER_BETWEEN_ACCOUNTS' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CHECK_ACCOUNT_BALANCE', '/[0-9]*/balance', 'GET', false, 1
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CHECK_ACCOUNT_BALANCE' AND modules_id = 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_TRANSACTION', '/[0-9]', 'GET', false, 2
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_TRANSACTION' AND modules_id = 2);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_TRANSACTIONS', '', 'GET', false, 2
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_TRANSACTIONS' AND modules_id = 2);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_USERS', '', 'GET', false, 3
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_USERS' AND modules_id = 3);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'REGISTER_ONE', '', 'POST', true, 3
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'REGISTER_ONE' AND modules_id = 3);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'AUTHENTICATE', '/authenticate', 'POST', true, 4
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'AUTHENTICATE' AND modules_id = 4);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'VALIDATE_TOKEN', '/validate-token', 'GET', true, 4
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'VALIDATE_TOKEN' AND modules_id = 4);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_MY_PROFILE', '/profile', 'GET', false, 4
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_MY_PROFILE' AND modules_id = 4);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'LOGOUT', '/logout', 'POST', true, 4
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'LOGOUT' AND modules_id = 4);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CREATE_ONE_MODULE', '', 'POST', false, 5
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_MODULE' AND modules_id = 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_MODULE', '/[0-9]*', 'GET', false, 5
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_MODULE' AND modules_id = 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_MODULES', '', 'GET', false, 5
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_MODULES' AND modules_id = 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'UPDATE_ONE_MODULE', '/[0-9]*', 'PUT', false, 5
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_MODULE' AND modules_id = 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DELETE_ONE_MODULE', '/[0-9]*', 'DELETE', false, 5
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_MODULE' AND modules_id = 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CREATE_ONE_OPERATION', '', 'POST', false, 6
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_OPERATION' AND modules_id = 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_OPERATION', '/[0-9]*', 'GET', false, 6
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_OPERATION' AND modules_id = 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_OPERATIONS', '', 'GET', false, 6
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_OPERATIONS' AND modules_id = 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'UPDATE_ONE_OPERATION', '/[0-9]*', 'PUT', false, 6
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_OPERATION' AND modules_id = 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DELETE_ONE_OPERATION', '/[0-9]*', 'DELETE', false, 6
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_OPERATION' AND modules_id = 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CREATE_ONE_PERMISSION', '', 'POST', false, 7
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_PERMISSION' AND modules_id = 7);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_PERMISSION', '/[0-9]*', 'GET', false, 7
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_PERMISSION' AND modules_id = 7);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_PERMISSIONS', '', 'GET', false, 7
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_PERMISSIONS' AND modules_id = 7);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DELETE_ONE_PERMISSION', '/[0-9]*', 'DELETE', false, 7
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_PERMISSION' AND modules_id = 7);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'CREATE_ONE_ROLE', '', 'POST', false, 8
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_ROLE' AND modules_id = 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ONE_ROLE', '/[0-9]*', 'GET', false, 8
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_ROLE' AND modules_id = 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_ALL_ROLES', '', 'GET', false, 8
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_ROLES' AND modules_id = 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'UPDATE_ONE_ROLE', '/[0-9]*', 'PUT', false, 8
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_ROLE' AND modules_id = 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'DELETE_ONE_ROLE', '/[0-9]*', 'DELETE', false, 8
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_ROLE' AND modules_id = 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) 
SELECT 'READ_STATISTICS', '', 'GET', false, 9
WHERE NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_STATISTICS' AND modules_id = 9);

-- CREACIÓN DE ROLES
INSERT INTO roles (name)
SELECT 'ADMINISTRATOR'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ADMINISTRATOR');
INSERT INTO roles (name)
SELECT 'EMPLOYEE'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'EMPLOYEE');
INSERT INTO roles (name)
SELECT 'CUSTOMER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'CUSTOMER');

-- CREACIÓN DE PERMISOS

INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 1 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 1);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 2 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 2);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 3 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 3);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 4 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 4);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 5 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 5);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 6 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 6);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 7 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 7);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 8 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 8);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 9 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 9);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 10 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 10);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 11 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 11);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 12 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 12);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 17 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 17);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 19 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 19);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 20 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 20);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 21 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 21);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 22 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 22);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 23 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 23);

INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 24 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 24);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 25 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 25);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 26 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 26);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 27 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 27);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 28 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 28);

SELECT 1, 29 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 29);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 30 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 30);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 31 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 31);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 32 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 32);

INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 33 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 33);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 34 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 34);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 35 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 35);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 36 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 36);
INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 37 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 37);

INSERT INTO permissions (roles_id, operations_id)
SELECT 1, 38 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 1 AND operations_id = 38);

INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 1 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 1);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 2 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 2);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 3 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 3);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 4 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 4);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 5 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 5);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 7 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 7);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 8 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 8);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 9 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 9);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 10 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 10);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 11 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 11);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 12 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 12);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 17 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 17);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 20 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 20);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 21 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 21);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 25 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 25);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 26 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 26);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 30 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 30);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 31 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 31);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 34 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 34);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 35 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 35);
INSERT INTO permissions (roles_id, operations_id)
SELECT 2, 38 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 2 AND operations_id = 38);

INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 1 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 1);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 2 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 2);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 3 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 3);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 5 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 5);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 7 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 7);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 8 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 8);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 9 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 9);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 10 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 10);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 11 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 11);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 12 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 12);
INSERT INTO permissions (roles_id, operations_id)
SELECT 3, 17 WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE roles_id = 3 AND operations_id = 17);

-- CREACIÓN DE USUARIOS
INSERT INTO users (username, name, password, roles_id)
SELECT 'naruto', 'Naruto Uzumaki', '$2a$10$qkaFTalAazwppdw4T8uyGu4fWzY2D34zTdCKeyDFH17/UyPgmC5Oe', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'naruto');
INSERT INTO users (username, name, password, roles_id)
SELECT 'sasuke', 'Sasuke Uchiha', '$2a$10$8xahu0FssnjOsXtnBXYsc.ne9tI4.B9v0PHa06ltybM.x74QDvIVq', 2
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'sasuke');
INSERT INTO users (username, name, password, roles_id)
SELECT 'sakura', 'Sakura Haruno', '$2a$10$XDu.VeK6B/7G0GBm257rIu3R7pwXygAVpHotsy4x98KSF22Bdea0G', 3
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'sakura');
INSERT INTO users (username, name, password, roles_id)
SELECT 'kakashi', 'Kakashi Hatake', '$2a$10$HVjEpElssWISJcEN/nW8YeTSdpcaw8jgnPjsKtO.R3hOPxCXlCXsK', 3
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'kakashi');

-- CREACIÓN DE CUENTAS
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '394087875667608994', 5000.00, 'SAVINGS', 'ACTIVE', 3, '2024-01-15 10:30:45.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '394087875667608994');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '114087875602508931', 5000.00, 'CHECKING', 'ACTIVE', 3, '2024-02-10 14:15:30.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '114087875602508931');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '76591142607308616612', 10000.00, 'CHECKING', 'ACTIVE', 3, '2024-03-05 08:45:00.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '76591142607308616612');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '564738291056473829', 8000.00, 'SAVINGS', 'ACTIVE', 3, '2024-02-01 14:30:00.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '564738291056473829');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '908070605040302010', 3000.00, 'CHECKING', 'ACTIVE', 3, '2024-02-15 09:45:00.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '908070605040302010');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '2017374309977551073', 10000.00, 'SAVINGS', 'ACTIVE', 4, '2024-04-20 19:25:10.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '2017374309977551073');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '234567890123456789', 12000.00, 'SAVINGS', 'ACTIVE', 4, '2024-03-01 11:20:00.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '234567890123456789');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at)
SELECT '987654123456789012', 15000.00, 'CHECKING', 'ACTIVE', 4, '2024-03-10 13:15:00.369442'
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '987654123456789012');

-- CREACIÓN DE TRANSACCIONES
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment)
SELECT '913381791423', 'DEPOSIT', 5000.00, NULL, 1, '2025-01-06 19:10:08.369442', 'Kakashi deposit'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '913381791423');
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment)
SELECT '505050505023', 'DEPOSIT', 3000.00, NULL, 7, '2024-03-15 09:10:00.369442', 'Kakashi deposit'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '505050505023');
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment)
SELECT '606060606043', 'WITHDRAW', 2500.00, 8, NULL, '2024-03-20 14:45:00.369442', 'Kakashi withdrawal'
WHERE NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '606060606043');

INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
JOIN operations o ON o.name IN (

  'CREATE_ONE_PERMISSION',
  'READ_ONE_PERMISSION',
  'READ_ALL_PERMISSIONS',
  'DELETE_ONE_PERMISSION',

  'READ_ONE_OPERATION',
  'READ_ALL_OPERATIONS',

  'READ_ONE_ROLE',
  'READ_ALL_ROLES',

  'READ_ONE_MODULE',
  'READ_ALL_MODULES'

)
WHERE r.name = 'ADMINISTRATOR'
AND NOT EXISTS (
  SELECT 1
  FROM permissions p
  WHERE p.roles_id = r.id
  AND p.operations_id = o.id
);
