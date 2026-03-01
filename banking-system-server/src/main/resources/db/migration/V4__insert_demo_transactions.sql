/* =========================================================
   TRANSACTIONS DATA
   ========================================================= */

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
    t.transaction_number,
    src.id,
    tgt.id,
    t.amount,
    t.transaction_date,
    t.type,
    t.comment
FROM (
    /* Naruto (ADMIN) - Account: 112233445501 */
    SELECT '200000000001', NULL, '112233445501', 150000, '2025-01-15', 'DEPOSIT',  'Admin bonus'
    UNION ALL
    SELECT '200000000002', '112233445501', NULL, 80000,  '2025-02-10', 'WITHDRAW', 'System maintenance expense'
    UNION ALL
    SELECT '200000000003', NULL, '112233445501', 200000, '2025-03-05', 'DEPOSIT',  'Quarterly funding'

    /* Sasuke (EMPLOYEE) - Account: 445566778834 */
    UNION ALL
    SELECT '200000000004', NULL, '445566778834', 75000, '2025-01-30', 'DEPOSIT',  'Monthly salary'
    UNION ALL
    SELECT '200000000005', '445566778834', NULL, 30000, '2025-02-20', 'WITHDRAW', 'Personal expenses'
    UNION ALL
    SELECT '200000000006', NULL, '445566778834', 75000, '2025-02-28', 'DEPOSIT',  'Monthly salary'
    UNION ALL
    SELECT '200000000007', NULL, '445566778834', 75000, '2025-03-31', 'DEPOSIT',  'Monthly salary'

    /* Sakura (CUSTOMER) - Account: 778899001167 */
    UNION ALL
    SELECT '200000000008', NULL, '778899001167', 50000, '2025-01-20', 'DEPOSIT',  'Salary deposit'
    UNION ALL
    SELECT '200000000009', '778899001167', NULL, 20000, '2025-01-25', 'WITHDRAW', 'Shopping'

    /* Transfers */
    UNION ALL
    SELECT '200000000010', '112233445501', '778899001167', 15000, '2025-02-05', 'TRANSFER', 'Naruto → Sakura (gift)'
    UNION ALL
    SELECT '200000000011', '778899001167', '445566778834', 20000, '2025-02-15', 'TRANSFER', 'Sakura → Sasuke (payment)'
    UNION ALL
    SELECT '200000000012', '445566778834', '112233445501', 25000, '2025-03-10', 'TRANSFER', 'Sasuke → Naruto (reimbursement)'

    /* More activity */
    UNION ALL
    SELECT '200000000013', NULL, '112233445501', 100000, '2025-04-01', 'DEPOSIT',  'Tax refund (Naruto)'
    UNION ALL
    SELECT '200000000014', '778899001167', NULL, 15000, '2025-04-15', 'WITHDRAW', 'Groceries (Sakura)'
    UNION ALL
    SELECT '200000000015', NULL, '445566778834', 75000, '2025-04-30', 'DEPOSIT',  'Monthly salary (Sasuke)'
    UNION ALL
    SELECT '200000000016', '112233445501', '445566778834', 30000, '2025-05-10', 'TRANSFER', 'Naruto → Sasuke (team bonus)'
    UNION ALL
    SELECT '200000000017', '778899001167', NULL, 40000, '2025-06-05', 'WITHDRAW', 'Medical expense (Sakura)'
    UNION ALL
    SELECT '200000000018', NULL, '778899001167', 50000, '2025-07-01', 'DEPOSIT',  'Freelance payment (Sakura)'
    UNION ALL
    SELECT '200000000019', '778899001167', '112233445501', 10000, '2025-08-20', 'TRANSFER', 'Sakura → Naruto (thank you)'
    UNION ALL
    SELECT '200000000020', '445566778834', NULL, 50000, '2025-09-15', 'WITHDRAW', 'Training equipment (Sasuke)'

    /* Final batch */
    UNION ALL
    SELECT '200000000021', NULL, '112233445501', 180000, '2025-10-01', 'DEPOSIT',  'Annual bonus (Naruto)'
    UNION ALL
    SELECT '200000000022', NULL, '778899001167', 80000,  '2025-11-01', 'DEPOSIT',  'Project payment (Sakura)'
    UNION ALL
    SELECT '200000000023', NULL, '445566778834', 90000,  '2025-12-01', 'DEPOSIT',  'Year-end bonus (Sasuke)'
    UNION ALL
    SELECT '200000000024', '112233445501', '778899001167', 20000, '2025-12-20', 'TRANSFER', 'Naruto → Sakura (holiday gift)'

) AS t(
    transaction_number,
    source_account_number,
    target_account_number,
    amount,
    transaction_date,
    type,
    comment
)
LEFT JOIN accounts src ON src.account_number = t.source_account_number
LEFT JOIN accounts tgt ON tgt.account_number = t.target_account_number;