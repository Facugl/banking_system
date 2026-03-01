/* =========================================================
   USERS
   ========================================================= */

INSERT INTO users (username, name, password, roles_id)
SELECT 'naruto','Naruto Uzumaki',
'$2a$10$qkaFTalAazwppdw4T8uyGu4fWzY2D34zTdCKeyDFH17/UyPgmC5Oe',
id FROM roles WHERE name='ADMINISTRATOR';

INSERT INTO users (username, name, password, roles_id)
SELECT 'sasuke','Sasuke Uchiha',
'$2a$10$8xahu0FssnjOsXtnBXYsc.ne9tI4.B9v0PHa06ltybM.x74QDvIVq',
id FROM roles WHERE name='EMPLOYEE';

INSERT INTO users (username, name, password, roles_id)
SELECT 'sakura','Sakura Haruno',
'$2a$10$XDu.VeK6B/7G0GBm257rIu3R7pwXygAVpHotsy4x98KSF22Bdea0G',
id FROM roles WHERE name='CUSTOMER';


/* =========================================================
   ACCOUNTS
   ========================================================= */

/* ======================
   NARUTO (ADMINISTRATOR)
   ====================== */

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
    750000.00,
    'ACTIVE',
    u.id,
    DATE '2025-03-15'
FROM users u
WHERE u.username = 'naruto';

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
    450000.00,
    'ACTIVE',
    u.id,
    DATE '2025-06-20'
FROM users u
WHERE u.username = 'naruto';

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
    300000.00,
    'INACTIVE',
    u.id,
    DATE '2025-09-01'
FROM users u
WHERE u.username = 'naruto';

/* ======================
   SASUKE (EMPLOYEE)
   ====================== */

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
    380000.00,
    'ACTIVE',
    u.id,
    DATE '2025-04-10'
FROM users u
WHERE u.username = 'sasuke';

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
    620000.00,
    'ACTIVE',
    u.id,
    DATE '2025-07-05'
FROM users u
WHERE u.username = 'sasuke';

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
    150000.00,
    'BLOCKED',
    u.id,
    DATE '2025-10-15'
FROM users u
WHERE u.username = 'sasuke';

/* ======================
   SAKURA (CUSTOMER)
   ====================== */

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
    295000.00,
    'ACTIVE',
    u.id,
    DATE '2025-05-01'
FROM users u
WHERE u.username = 'sakura';

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
    210000.00,
    'ACTIVE',
    u.id,
    DATE '2025-08-15'
FROM users u
WHERE u.username = 'sakura';

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
    0.00,
    'CLOSED',
    u.id,
    DATE '2025-02-28'
FROM users u
WHERE u.username = 'sakura';