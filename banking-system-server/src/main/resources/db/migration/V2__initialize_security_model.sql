/* =========================================================
   MODULES
   ========================================================= */
INSERT INTO modules (name, base_path) VALUES
('ACCOUNT','/accounts'),
('TRANSACTION','/transactions'),
('USER','/users'),
('AUTH','/auth'),
('MODULE','/modules'),
('OPERATION','/operations'),
('PERMISSION','/permissions'),
('ROLE','/roles'),
('STATISTICS','/statistics');


/* =========================================================
   ROLES
   ========================================================= */
INSERT INTO roles (name) VALUES
('ADMINISTRATOR'),
('EMPLOYEE'),
('CUSTOMER');


/* =========================================================
   OPERATIONS
   ========================================================= */
/* MODULE */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_MODULE', '', 'POST', false, id FROM modules WHERE name='MODULE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_MODULE', '/[0-9]*', 'GET', false, id FROM modules WHERE name='MODULE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_MODULES', '', 'GET', false, id FROM modules WHERE name='MODULE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_MODULE', '/[0-9]*', 'PUT', false, id FROM modules WHERE name='MODULE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_MODULE', '/[0-9]*', 'DELETE', false, id FROM modules WHERE name='MODULE';


/* OPERATION */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_OPERATION', '', 'POST', false, id FROM modules WHERE name='OPERATION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_OPERATION', '/[0-9]*', 'GET', false, id FROM modules WHERE name='OPERATION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_OPERATIONS', '', 'GET', false, id FROM modules WHERE name='OPERATION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_OPERATION', '/[0-9]*', 'PUT', false, id FROM modules WHERE name='OPERATION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_OPERATION', '/[0-9]*', 'DELETE', false, id FROM modules WHERE name='OPERATION';


/* ROLE */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_ROLE', '', 'POST', false, id FROM modules WHERE name='ROLE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_ROLE', '/[0-9]*', 'GET', false, id FROM modules WHERE name='ROLE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_ROLES', '', 'GET', false, id FROM modules WHERE name='ROLE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_ROLE', '/[0-9]*', 'PUT', false, id FROM modules WHERE name='ROLE';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_ROLE', '/[0-9]*', 'DELETE', false, id FROM modules WHERE name='ROLE';


/* PERMISSION */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_PERMISSION', '', 'POST', false, id FROM modules WHERE name='PERMISSION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_PERMISSION', '/[0-9]*', 'GET', false, id FROM modules WHERE name='PERMISSION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_PERMISSIONS', '', 'GET', false, id FROM modules WHERE name='PERMISSION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_PERMISSION', '/[0-9]*', 'DELETE', false, id FROM modules WHERE name='PERMISSION';


/* ACCOUNT */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_ACCOUNT', '', 'POST', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_ACCOUNT', '/[0-9]*', 'GET', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_ACCOUNTS', '', 'GET', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_ACCOUNT', '/[0-9]*', 'PUT', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ACCOUNT_STATUS', '/[0-9]*/change-status', 'PATCH', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_ACCOUNT', '/[0-9]*', 'DELETE', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DEPOSIT_INTO_ACCOUNT', '/[0-9]*/deposit', 'POST', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'WITHDRAW_FROM_ACCOUNT', '/[0-9]*/withdraw', 'POST', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'TRANSFER_BETWEEN_ACCOUNTS', '/[0-9]*/transfer', 'POST', false, id FROM modules WHERE name='ACCOUNT';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CHECK_ACCOUNT_BALANCE', '/[0-9]*/balance', 'GET', false, id FROM modules WHERE name='ACCOUNT';


/* AUTH */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'AUTHENTICATE','/authenticate','POST',true,id FROM modules WHERE name='AUTH';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'VALIDATE_TOKEN','/validate-token','GET',true,id FROM modules WHERE name='AUTH';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_MY_PROFILE','/profile','GET',false,id FROM modules WHERE name='AUTH';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'LOGOUT','/logout','POST',true,id FROM modules WHERE name='AUTH';


/* TRANSACTION */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_TRANSACTION','/[0-9]*','GET',false,id FROM modules WHERE name='TRANSACTION';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_TRANSACTIONS','','GET',false,id FROM modules WHERE name='TRANSACTION';


/* USER */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_USERS','','GET',false,id FROM modules WHERE name='USER';

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'REGISTER_ONE','','POST',true,id FROM modules WHERE name='USER';


/* STATISTICS */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_STATISTICS','','GET',false,id FROM modules WHERE name='STATISTICS';


/* ADMINISTRATOR gets ALL operations */
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
CROSS JOIN operations o
WHERE r.name='ADMINISTRATOR';


/* EMPLOYEE permissions */
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
JOIN operations o ON o.name IN (
'CREATE_ONE_ACCOUNT','READ_ONE_ACCOUNT','READ_ALL_ACCOUNTS',
'UPDATE_ONE_ACCOUNT','UPDATE_ACCOUNT_STATUS','DEPOSIT_INTO_ACCOUNT',
'WITHDRAW_FROM_ACCOUNT','TRANSFER_BETWEEN_ACCOUNTS',
'CHECK_ACCOUNT_BALANCE','READ_ONE_TRANSACTION',
'READ_ALL_TRANSACTIONS','READ_ALL_USERS','READ_MY_PROFILE'
)
WHERE r.name='EMPLOYEE';


/* CUSTOMER permissions */
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
JOIN operations o ON o.name IN (
'CREATE_ONE_ACCOUNT','READ_ONE_ACCOUNT','READ_ALL_ACCOUNTS',
'DEPOSIT_INTO_ACCOUNT','WITHDRAW_FROM_ACCOUNT',
'TRANSFER_BETWEEN_ACCOUNTS','CHECK_ACCOUNT_BALANCE',
'READ_ONE_TRANSACTION','READ_ALL_TRANSACTIONS','READ_MY_PROFILE'
)
WHERE r.name='CUSTOMER';