-- CREACIÓN DE MODULOS
INSERT INTO modules (name, base_path) VALUES ('ACCOUNT', '/accounts');
INSERT INTO modules (name, base_path) VALUES ('TRANSACTION', '/transactions');
INSERT INTO modules (name, base_path) VALUES ('USER', '/users');
INSERT INTO modules (name, base_path) VALUES ('AUTH', '/auth');
INSERT INTO modules (name, base_path) VALUES ('MODULE', '/modules');
INSERT INTO modules (name, base_path) VALUES ('OPERATION', '/operations');
INSERT INTO modules (name, base_path) VALUES ('PERMISSION', '/permissions');
INSERT INTO modules (name, base_path) VALUES ('ROLE', '/roles');
INSERT INTO modules (name, base_path) VALUES ('STATISTICS', '/statistics');

-- CREACIÓN DE OPERACIONES
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CREATE_ONE_ACCOUNT','', 'POST', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_ACCOUNT','/[0-9]*', 'GET', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_ACCOUNTS','', 'GET', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('UPDATE_ONE_ACCOUNT','/[0-9]*', 'PUT', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('UPDATE_ACCOUNT_STATUS','/[0-9]*/change-status', 'PATCH', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DELETE_ONE_ACCOUNT','/[0-9]*', 'DELETE', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DEPOSIT_INTO_ACCOUNT','/[0-9]*/deposit', 'POST', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('WITHDRAW_FROM_ACCOUNT','/[0-9]*/withdraw', 'POST', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('TRANSFER_BETWEEN_ACCOUNTS','/[0-9]*/transfer', 'POST', false, 1);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CHECK_ACCOUNT_BALANCE','/[0-9]*/balance', 'GET', false, 1);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_TRANSACTION','/[0-9]*', 'GET', false, 2);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_TRANSACTIONS','', 'GET', false, 2);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_USERS','', 'GET', false, 3);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('REGISTER_ONE','', 'POST', true, 3);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('AUTHENTICATE','/authenticate', 'POST', true, 4);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('VALIDATE-TOKEN','/validate-token', 'GET', true, 4);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_MY_PROFILE','/profile','GET', false, 4);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('LOGOUT','/logout','POST', true, 4);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CREATE_ONE_MODULE','', 'POST', false, 5);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_MODULE','/[0-9]*', 'GET', false, 5);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_MODULES','', 'GET', false, 5);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('UPDATE_ONE_MODULE','/[0-9]*', 'PUT', false, 5);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DELETE_ONE_MODULE','/[0-9]*', 'DELETE', false, 5);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CREATE_ONE_OPERATION','', 'POST', false, 6);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_OPERATION','/[0-9]*', 'GET', false, 6);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_OPERATIONS','', 'GET', false, 6);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('UPDATE_ONE_OPERATION','/[0-9]*', 'PUT', false, 6);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DELETE_ONE_OPERATION','/[0-9]*', 'DELETE', false, 6);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CREATE_ONE_PERMISSION','', 'POST', false, 7);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_PERMISSION','/[0-9]*', 'GET', false, 7);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_PERMISSIONS','', 'GET', false, 7);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DELETE_ONE_PERMISSION','/[0-9]*', 'DELETE', false, 7);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('CREATE_ONE_ROLE','', 'POST', false, 8);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ONE_ROLE','/[0-9]*', 'GET', false, 8);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_ALL_ROLES','', 'GET', false, 8);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('UPDATE_ONE_ROLE','/[0-9]*', 'PUT', false, 8);
INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('DELETE_ONE_ROLE','/[0-9]*', 'DELETE', false, 8);

INSERT INTO operations (name, path, http_method, permit_all, modules_id) VALUES ('READ_STATISTICS', '', 'GET', false, 9);

-- CREACIÓN DE ROLES
INSERT INTO roles (name) VALUES ('ADMINISTRATOR');
INSERT INTO roles (name) VALUES ('EMPLOYEE');
INSERT INTO roles (name) VALUES ('CUSTOMER');

-- CREACIÓN DE PERMISOS
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 1);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 2);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 3);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 4);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 5);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 6);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 7);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 8);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 9);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 10);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 11);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 12);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 17);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 19);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 20);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 21);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 22);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 23);

INSERT INTO permissions (roles_id, operations_id) VALUES (1, 24);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 25);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 26);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 27);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 28);

INSERT INTO permissions (roles_id, operations_id) VALUES (1, 29);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 30);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 31);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 32);

INSERT INTO permissions (roles_id, operations_id) VALUES (1, 33);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 34);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 35);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 36);
INSERT INTO permissions (roles_id, operations_id) VALUES (1, 37);

INSERT INTO permissions (roles_id, operations_id) VALUES (1, 38);

INSERT INTO permissions (roles_id, operations_id) VALUES (2, 1);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 2);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 3);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 4);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 5);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 7);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 8);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 9);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 10);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 11);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 12);
INSERT INTO permissions (roles_id, operations_id) VALUES (2, 17);

INSERT INTO permissions (roles_id, operations_id) VALUES (3, 1);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 2);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 3);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 5);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 7);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 8);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 9);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 10);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 11);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 12);
INSERT INTO permissions (roles_id, operations_id) VALUES (3, 17);

-- CREACIÓN DE USUARIOS
INSERT INTO users (username, name, password, roles_id) VALUES ('naruto', 'Naruto Uzumaki', '$2a$10$qkaFTalAazwppdw4T8uyGu4fWzY2D34zTdCKeyDFH17/UyPgmC5Oe', 1);
INSERT INTO users (username, name, password, roles_id) VALUES ('sasuke', 'Sasuke Uchiha', '$2a$10$8xahu0FssnjOsXtnBXYsc.ne9tI4.B9v0PHa06ltybM.x74QDvIVq', 2);
INSERT INTO users (username, name, password, roles_id) VALUES ('sakura', 'Sakura Haruno', '$2a$10$XDu.VeK6B/7G0GBm257rIu3R7pwXygAVpHotsy4x98KSF22Bdea0G', 3);
INSERT INTO users (username, name, password, roles_id) VALUES ('kakashi', 'Kakashi Hatake', '$2a$10$HVjEpElssWISJcEN/nW8YeTSdpcaw8jgnPjsKtO.R3hOPxCXlCXsK', 3);

-- CREACIÓN DE CUENTAS
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('394087875667608994', 5000.00, 'SAVINGS', 'ACTIVE', 3, '2024-01-15 10:30:45.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('114087875602508931', 5000.00, 'CHECKING', 'ACTIVE', 3, '2024-02-10 14:15:30.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('76591142607308616612', 10000.00, 'CHECKING', 'ACTIVE', 3, '2024-03-05 08:45:00.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('564738291056473829', 8000.00, 'SAVINGS', 'ACTIVE', 3, '2024-02-01 14:30:00.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('908070605040302010', 3000.00, 'CHECKING', 'ACTIVE', 3, '2024-02-15 09:45:00.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('2017374309977551073', 10000.00, 'SAVINGS', 'ACTIVE', 4, '2024-04-20 19:25:10.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('234567890123456789', 12000.00, 'SAVINGS', 'ACTIVE', 4, '2024-03-01 11:20:00.369442');
INSERT INTO accounts (account_number, balance, type, status, users_id, created_at) VALUES ('987654123456789012', 15000.00, 'CHECKING', 'ACTIVE', 4, '2024-03-10 13:15:00.369442');

-- CREACIÓN DE TRANSACCIONES
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment) 
VALUES ('913381791423', 'DEPOSIT', 5000.00, null, 1, '2025-01-06 19:10:08.369442', 'Kakashi deposit');
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment) 
VALUES ('505050505023', 'DEPOSIT', 3000.00, null, 7, '2024-03-15 09:10:00.369442', 'Kakashi deposit');
INSERT INTO transactions (transaction_number, type, amount, source_account_id, target_account_id, transaction_date, comment) 
VALUES ('606060606043', 'WITHDRAW', 2500.00, 8, null, '2024-03-20 14:45:00.369442', 'Kakashi withdrawal');
