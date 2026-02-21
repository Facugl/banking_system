/* =========================================================
   MODULE
   ========================================================= */
INSERT INTO modules (name, base_path)
VALUES ('ACCOUNT', '/accounts');


/* =========================================================
   OPERATIONS
   ========================================================= */
INSERT INTO operations (name, path, http_method, permit_all, modules_id)
VALUES
('CREATE_ONE_ACCOUNT', '', 'POST', false, 1),
('DEPOSIT_INTO_ACCOUNT', '/[0-9]*/deposit', 'POST', false, 1),
('TRANSFER_BETWEEN_ACCOUNTS', '/[0-9]*/transfer', 'POST', false, 1),
('READ_ONE_ACCOUNT', '/[0-9]*', 'GET', false, 1);


/* =========================================================
   ROLE
   ========================================================= */
INSERT INTO roles (name)
VALUES ('CUSTOMER');


/* =========================================================
   PERMISSIONS
   ========================================================= */
INSERT INTO permissions (roles_id, operations_id)
VALUES
(1,1),
(1,2),
(1,3),
(1,4);


/* =========================================================
   USER
   ========================================================= */
INSERT INTO users (username, name, password, roles_id)
VALUES (
  'testuser',
  'Test User',
  '$2a$10$qkaFTalAazwppdw4T8uyGu4fWzY2D34zTdCKeyDFH17/UyPgmC5Oe',
  1
);


/* =========================================================
   ACCOUNTS
   ========================================================= */
INSERT INTO accounts (
    account_number,
    type,
    balance,
    status,
    users_id,
    created_at
)
VALUES
(
  '100000000001',
  'SAVINGS',
  1000,
  'ACTIVE',
  1,
  '2025-01-01'
),
(
  '100000000002',
  'SAVINGS',
  500,
  'ACTIVE',
  1,
  '2025-01-01'
);
