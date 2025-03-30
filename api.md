# API Documentation - Account Management

## Usage Examples with `curl`

```bash
# Base URL
BASE_URL="http://localhost:8080/api/v1/accounts"

# 1. Create an Account
curl -X POST "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{
  "accountNumber": "1234567890",
  "type": "SAVINGS",
  "balance": 1000.00
}'

# 2. Get an Account by ID
curl -X GET "$BASE_URL/1"

# 3. Get All Accounts
curl -X GET "$BASE_URL"

# 4. Update an Account
curl -X PUT "$BASE_URL/1" \
-H "Content-Type: application/json" \
-d '{
  "accountNumber": "1234567890",
  "type": "CURRENT",
  "balance": 1500.00
}'

# 5. Delete an Account
curl -X DELETE "$BASE_URL/1"

# 6. Deposit to an Account
curl -X POST "$BASE_URL/1/deposit?amount=500.00"

# 7. Withdraw from an Account
curl -X POST "$BASE_URL/1/withdraw?amount=200.00"
