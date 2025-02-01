## Permissions Table

| **Module**      | **Operation**      | **Admin** | **Employee** | **Client**                                                   |
| --------------- | ------------------ | --------- | ------------ | ------------------------------------------------------------ |
| **Account**     | Create account     | ✅        | ✅           | ✅                                                           |
|                 | Get account        | ✅        | ✅           | ✅                                                           |
|                 | Get accounts       | ✅        | ✅           | ✅ (only their own accounts)                                 |
|                 | Update account     | ✅        | ✅           | ✅ (only the `status` attribute)                             |
|                 | Delete account     | ✅        | ❌           | ❌                                                           |
|                 | Deposit            | ✅        | ✅           | ✅ (only to their own accounts)                              |
|                 | Withdraw           | ✅        | ✅           | ✅ (only from their own accounts with sufficient balance)    |
|                 | Transfer           | ✅        | ✅           | ✅ (only from their own accounts to other existing accounts) |
|                 | Get balance        | ✅        | ✅           | ✅ (only their own accounts)                                 |
| **Transaction** | Create transaction | ❌        | ❌           | ❌ (automatic upon deposit, withdrawal, or transfer)         |
|                 | Get transaction    | ✅        | ✅           | ✅                                                           |
|                 | Get transactions   | ✅        | ✅           | ✅ (only transactions related to their accounts)             |
