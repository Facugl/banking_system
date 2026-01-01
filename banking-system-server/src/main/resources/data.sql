/* =========================================================
   MODULES
   ========================================================= */
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



/* =========================================================
   OPERATIONS
   ========================================================= */

-- ACCOUNT
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_ACCOUNT', '', 'POST', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_ACCOUNT', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_ACCOUNTS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_ACCOUNTS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_ACCOUNT', '/[0-9]*', 'PUT', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ACCOUNT_STATUS', '/[0-9]*/change-status', 'PATCH', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ACCOUNT_STATUS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_ACCOUNT', '/[0-9]*', 'DELETE', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DEPOSIT_INTO_ACCOUNT', '/[0-9]*/deposit', 'POST', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DEPOSIT_INTO_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'WITHDRAW_FROM_ACCOUNT', '/[0-9]*/withdraw', 'POST', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'WITHDRAW_FROM_ACCOUNT');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'TRANSFER_BETWEEN_ACCOUNTS', '/[0-9]*/transfer', 'POST', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'TRANSFER_BETWEEN_ACCOUNTS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CHECK_ACCOUNT_BALANCE', '/[0-9]*/balance', 'GET', false, m.id
FROM modules m WHERE m.name = 'ACCOUNT'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CHECK_ACCOUNT_BALANCE');


-- TRANSACTION
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_TRANSACTION', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'TRANSACTION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_TRANSACTION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_TRANSACTIONS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'TRANSACTION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_TRANSACTIONS');


-- USER
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_USERS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'USER'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_USERS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'REGISTER_ONE', '', 'POST', true, m.id
FROM modules m WHERE m.name = 'USER'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'REGISTER_ONE');


-- AUTH
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'AUTHENTICATE', '/authenticate', 'POST', true, m.id
FROM modules m WHERE m.name = 'AUTH'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'AUTHENTICATE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'VALIDATE_TOKEN', '/validate-token', 'GET', true, m.id
FROM modules m WHERE m.name = 'AUTH'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'VALIDATE_TOKEN');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_MY_PROFILE', '/profile', 'GET', false, m.id
FROM modules m WHERE m.name = 'AUTH'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_MY_PROFILE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'LOGOUT', '/logout', 'POST', true, m.id
FROM modules m WHERE m.name = 'AUTH'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'LOGOUT');


-- ADMIN SUPPORT
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_STATISTICS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'STATISTICS'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_STATISTICS');

--  MODULE
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_MODULE', '', 'POST', false, m.id
FROM modules m WHERE m.name = 'MODULE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_MODULE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_MODULE', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'MODULE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_MODULE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_MODULES', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'MODULE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_MODULES');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_MODULE', '/[0-9]*', 'PUT', false, m.id
FROM modules m WHERE m.name = 'MODULE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_MODULE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_MODULE', '/[0-9]*', 'DELETE', false, m.id
FROM modules m WHERE m.name = 'MODULE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_MODULE');

--  OPERATION
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_OPERATION', '', 'POST', false, m.id
FROM modules m WHERE m.name = 'OPERATION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_OPERATION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_OPERATION', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'OPERATION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_OPERATION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_OPERATIONS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'OPERATION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_OPERATIONS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_OPERATION', '/[0-9]*', 'PUT', false, m.id
FROM modules m WHERE m.name = 'OPERATION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_OPERATION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_OPERATION', '/[0-9]*', 'DELETE', false, m.id
FROM modules m WHERE m.name = 'OPERATION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_OPERATION');

--  ROLE
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_ROLE', '', 'POST', false, m.id
FROM modules m WHERE m.name = 'ROLE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_ROLE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_ROLE', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'ROLE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_ROLE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_ROLES', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'ROLE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_ROLES');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'UPDATE_ONE_ROLE', '/[0-9]*', 'PUT', false, m.id
FROM modules m WHERE m.name = 'ROLE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'UPDATE_ONE_ROLE');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_ROLE', '/[0-9]*', 'DELETE', false, m.id
FROM modules m WHERE m.name = 'ROLE'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_ROLE');

--  PERMISSION
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'CREATE_ONE_PERMISSION', '', 'POST', false, m.id
FROM modules m WHERE m.name = 'PERMISSION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'CREATE_ONE_PERMISSION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ONE_PERMISSION', '/[0-9]*', 'GET', false, m.id
FROM modules m WHERE m.name = 'PERMISSION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ONE_PERMISSION');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'READ_ALL_PERMISSIONS', '', 'GET', false, m.id
FROM modules m WHERE m.name = 'PERMISSION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'READ_ALL_PERMISSIONS');

INSERT INTO operations (name, path, http_method, permit_all, modules_id)
SELECT 'DELETE_ONE_PERMISSION', '/[0-9]*', 'DELETE', false, m.id
FROM modules m WHERE m.name = 'PERMISSION'
AND NOT EXISTS (SELECT 1 FROM operations WHERE name = 'DELETE_ONE_PERMISSION');

/* =========================================================
   ROLES
   ========================================================= */
INSERT INTO roles (name)
SELECT 'ADMINISTRATOR'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ADMINISTRATOR');

INSERT INTO roles (name)
SELECT 'EMPLOYEE'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'EMPLOYEE');

INSERT INTO roles (name)
SELECT 'CUSTOMER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'CUSTOMER');



/* =========================================================
   PERMISSIONS
   ========================================================= */

-- ADMINISTRATOR → ALL OPERATIONS
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
CROSS JOIN operations o
WHERE r.name = 'ADMINISTRATOR'
AND NOT EXISTS (
  SELECT 1 FROM permissions p
  WHERE p.roles_id = r.id AND p.operations_id = o.id
);


-- EMPLOYEE
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
JOIN operations o ON o.name IN (
  'CREATE_ONE_ACCOUNT',
  'READ_ONE_ACCOUNT',
  'READ_ALL_ACCOUNTS',
  'UPDATE_ONE_ACCOUNT',
  'UPDATE_ACCOUNT_STATUS',
  'DEPOSIT_INTO_ACCOUNT',
  'WITHDRAW_FROM_ACCOUNT',
  'TRANSFER_BETWEEN_ACCOUNTS',
  'CHECK_ACCOUNT_BALANCE',
  'READ_ONE_TRANSACTION',
  'READ_ALL_TRANSACTIONS',
  'READ_ALL_USERS',
  'READ_MY_PROFILE'
)
WHERE r.name = 'EMPLOYEE'
AND NOT EXISTS (
  SELECT 1 FROM permissions p
  WHERE p.roles_id = r.id AND p.operations_id = o.id
);


-- CUSTOMER
INSERT INTO permissions (roles_id, operations_id)
SELECT r.id, o.id
FROM roles r
JOIN operations o ON o.name IN (
  'CREATE_ONE_ACCOUNT',
  'READ_ONE_ACCOUNT',
  'READ_ALL_ACCOUNTS',
  'DEPOSIT_INTO_ACCOUNT',
  'WITHDRAW_FROM_ACCOUNT',
  'TRANSFER_BETWEEN_ACCOUNTS',
  'CHECK_ACCOUNT_BALANCE',
  'READ_ONE_TRANSACTION',
  'READ_ALL_TRANSACTIONS',
  'READ_MY_PROFILE'
)
WHERE r.name = 'CUSTOMER'
AND NOT EXISTS (
  SELECT 1 FROM permissions p
  WHERE p.roles_id = r.id AND p.operations_id = o.id
);

/* =========================================================
   DEMO USERS
   ========================================================= */
INSERT INTO users (username, name, password, roles_id)
SELECT 'naruto', 'Naruto Uzumaki', '$2a$10$qkaFTalAazwppdw4T8uyGu4fWzY2D34zTdCKeyDFH17/UyPgmC5Oe', r.id
FROM roles r WHERE r.name = 'ADMINISTRATOR'
AND NOT EXISTS (SELECT 1 FROM users WHERE username = 'naruto');

INSERT INTO users (username, name, password, roles_id)
SELECT 'sasuke', 'Sasuke Uchiha', '$2a$10$8xahu0FssnjOsXtnBXYsc.ne9tI4.B9v0PHa06ltybM.x74QDvIVq', r.id
FROM roles r WHERE r.name = 'EMPLOYEE'
AND NOT EXISTS (SELECT 1 FROM users WHERE username = 'sasuke');

INSERT INTO users (username, name, password, roles_id)
SELECT 'sakura', 'Sakura Haruno', '$2a$10$XDu.VeK6B/7G0GBm257rIu3R7pwXygAVpHotsy4x98KSF22Bdea0G', r.id
FROM roles r WHERE r.name = 'CUSTOMER'
AND NOT EXISTS (SELECT 1 FROM users WHERE username = 'sakura');

/* =========================================================
   ACCOUNTS
   ========================================================= */

-- Naruto (ADMIN) - Additional SAVINGS account
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '112233445501',
    'SAVINGS',
    750000,
    'ACTIVE',
    u.id,
    '2025-03-15'
FROM users u
WHERE u.username = 'naruto'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '112233445501'
);

-- Naruto (ADMIN) - Additional CHECKING account (for daily operations)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '223344556612',
    'CHECKING',
    450000,
    'ACTIVE',
    u.id,
    '2025-06-20'
FROM users u
WHERE u.username = 'naruto'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '223344556612'
);

-- Naruto (ADMIN) - One INACTIVE account (demo purpose)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '334455667723',
    'SAVINGS',
    300000,
    'INACTIVE',
    u.id,
    '2025-09-01'
FROM users u
WHERE u.username = 'naruto'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '334455667723'
);

-- Sasuke (EMPLOYEE) - Additional CHECKING account
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '445566778834',
    'CHECKING',
    380000,
    'ACTIVE',
    u.id,
    '2025-04-10'
FROM users u
WHERE u.username = 'sasuke'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '445566778834'
);

-- Sasuke (EMPLOYEE) - Additional SAVINGS account (long-term)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '556677889945',
    'SAVINGS',
    620000,
    'ACTIVE',
    u.id,
    '2025-07-05'
FROM users u
WHERE u.username = 'sasuke'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '556677889945'
);

-- Sasuke (EMPLOYEE) - One BLOCKED account (demo purpose)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '667788990056',
    'CHECKING',
    150000,
    'BLOCKED',
    u.id,
    '2025-10-15'
FROM users u
WHERE u.username = 'sasuke'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '667788990056'
);

-- Sakura (CUSTOMER) - Additional SAVINGS account
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '778899001167',
    'SAVINGS',
    295000,
    'ACTIVE',
    u.id,
    '2025-05-01'
FROM users u
WHERE u.username = 'sakura'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '778899001167'
);

-- Sakura (CUSTOMER) - Additional CHECKING account (daily use)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '889900112278',
    'CHECKING',
    210000,
    'ACTIVE',
    u.id,
    '2025-08-15'
FROM users u
WHERE u.username = 'sakura'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '889900112278'
);

-- Sakura (CUSTOMER) - One CLOSED account (demo purpose - old account)
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
SELECT
    '990011223389',
    'SAVINGS',
    0,
    'CLOSED',
    u.id,
    '2025-02-28'
FROM users u
WHERE u.username = 'sakura'
AND NOT EXISTS (
    SELECT 1 FROM accounts WHERE account_number = '990011223389'
);

/* =========================================================
   DEMO TRANSACTIONS
   ========================================================= */

-- Naruto (ADMIN) - Various deposits and withdrawals
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000001',
    NULL,
    a.id,
    150000,
    '2025-01-15',
    'DEPOSIT',
    'Admin bonus'
FROM accounts a
WHERE a.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000001');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000002',
    a.id,
    NULL,
    80000,
    '2025-02-10',
    'WITHDRAW',
    'System maintenance expense'
FROM accounts a
WHERE a.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000002');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000003',
    NULL,
    a.id,
    200000,
    '2025-03-05',
    'DEPOSIT',
    'Quarterly funding'
FROM accounts a
WHERE a.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000003');

-- Sasuke (EMPLOYEE) - Salary deposits and personal expenses
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000004',
    NULL,
    a.id,
    75000,
    '2025-01-30',
    'DEPOSIT',
    'Monthly salary'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000004');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000005',
    a.id,
    NULL,
    30000,
    '2025-02-20',
    'WITHDRAW',
    'Personal expenses'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000005');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000006',
    NULL,
    a.id,
    75000,
    '2025-02-28',
    'DEPOSIT',
    'Monthly salary'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000006');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000007',
    NULL,
    a.id,
    75000,
    '2025-03-31',
    'DEPOSIT',
    'Monthly salary'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000007');

-- Sakura (CUSTOMER) - Regular customer activity
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000008',
    NULL,
    a.id,
    50000,
    '2025-01-20',
    'DEPOSIT',
    'Salary deposit'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000008');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000009',
    a.id,
    NULL,
    20000,
    '2025-01-25',
    'WITHDRAW',
    'Shopping'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000009');

-- Transfers between the three users
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000010',
    src.id,
    tgt.id,
    15000,
    '2025-02-05',
    'TRANSFER',
    'Naruto → Sakura (gift)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '920174638501'
WHERE src.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000010');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000011',
    src.id,
    tgt.id,
    20000,
    '2025-02-15',
    'TRANSFER',
    'Sakura → Sasuke (payment)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '739104826501'
WHERE src.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000011');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000012',
    src.id,
    tgt.id,
    25000,
    '2025-03-10',
    'TRANSFER',
    'Sasuke → Naruto (reimbursement)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '483920174563'
WHERE src.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000012');

-- More activity throughout the year
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000013',
    NULL,
    a.id,
    100000,
    '2025-04-01',
    'DEPOSIT',
    'Tax refund (Naruto)'
FROM accounts a
WHERE a.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000013');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000014',
    a.id,
    NULL,
    15000,
    '2025-04-15',
    'WITHDRAW',
    'Groceries (Sakura)'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000014');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000015',
    NULL,
    a.id,
    75000,
    '2025-04-30',
    'DEPOSIT',
    'Monthly salary (Sasuke)'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000015');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000016',
    src.id,
    tgt.id,
    30000,
    '2025-05-10',
    'TRANSFER',
    'Naruto → Sasuke (team bonus)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '739104826501'
WHERE src.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000016');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000017',
    a.id,
    NULL,
    40000,
    '2025-06-05',
    'WITHDRAW',
    'Medical expense (Sakura)'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000017');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000018',
    NULL,
    a.id,
    50000,
    '2025-07-01',
    'DEPOSIT',
    'Freelance payment (Sakura)'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000018');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000019',
    src.id,
    tgt.id,
    10000,
    '2025-08-20',
    'TRANSFER',
    'Sakura → Naruto (thank you)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '483920174563'
WHERE src.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000019');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000020',
    a.id,
    NULL,
    50000,
    '2025-09-15',
    'WITHDRAW',
    'Training equipment (Sasuke)'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000020');

-- Final batch for 2025
INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000021',
    NULL,
    a.id,
    180000,
    '2025-10-01',
    'DEPOSIT',
    'Annual bonus (Naruto)'
FROM accounts a
WHERE a.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000021');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000022',
    NULL,
    a.id,
    80000,
    '2025-11-01',
    'DEPOSIT',
    'Project payment (Sakura)'
FROM accounts a
WHERE a.account_number = '920174638501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000022');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000023',
    NULL,
    a.id,
    90000,
    '2025-12-01',
    'DEPOSIT',
    'Year-end bonus (Sasuke)'
FROM accounts a
WHERE a.account_number = '739104826501'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000023');

INSERT INTO transactions (
    transaction_number,
    source_account_id,
    target_account_id,
    amount,
    transaction_date,
    type,
    comment
)
SELECT
    '200000000024',
    src.id,
    tgt.id,
    20000,
    '2025-12-20',
    'TRANSFER',
    'Naruto → Sakura (holiday gift)'
FROM accounts src
JOIN accounts tgt ON tgt.account_number = '920174638501'
WHERE src.account_number = '483920174563'
AND NOT EXISTS (SELECT 1 FROM transactions WHERE transaction_number = '200000000024');