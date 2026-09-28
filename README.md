# Banking System

A production-ready full-stack banking application designed to demonstrate secure backend architecture, database-driven RBAC authorization, and real-world financial operations.

The system supports account management, deposits, withdrawals, transfers, transaction auditing, and role-based access control with JWT authentication.

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.4-green)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

**Live demo:** [banking-system-frontend-fny8.onrender.com](https://banking-system-frontend-fny8.onrender.com)

> Hosted on Render's free tier, so the backend spins down after inactivity — the first request after a while can take up to a minute. Log in with any of the seed users (e.g. `naruto` / `Naruto_123456`, an ADMINISTRATOR) to explore.

## Table of Contents

- [Project Highlights](#project-highlights)
- [System Architecture](#system-architecture)
- [Technical Overview](#technical-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Permissions Table](#permissions-table)
- [API Documentation](#api-documentation)
  - [Authenticate User](#authenticate-user)
  - [Transfer Money Between Accounts](#transfer-money-between-accounts)
  - [Logout User](#logout-user)

---

## Project Highlights
- JWT-based authentication with token invalidation (logout support)
- Database-driven RBAC (Module → Operation → Role → Permission)
- Feature-based layered backend architecture
- Fully containerized with Docker
- REST API built with Spring Boot
- Proper HTTP status code usage (200, 400, 401, 403, 404, 500)
- Modern frontend built with React and Redux Toolkit

---

## System Architecture
### High-Level Architecture

![High-Level Architecture](https://mermaid.ink/img/pako:eNo9jLFqw0AQRH9l2SoGmfQqDFFEIJAiWHZjn4vN3Vo6rLsVqxUpbP-7UaKknJk374peAmOJ516-fUdq8LF1GQBgP7LCer2BN5VsnMNxy-QNGiOLHppofPol_4CZvj3TEG9Qkb_Ml2bQmFuoRAxePt-Xw7L-2Gsy-qKRj0-7WFfw2ssUVicssNUYsDxTP3KBiTXRnPE6Kxxax4kdluAwkF4cunzHAgfKB5GEpenEBapMbfcvmYZAxnWkVikt7f0BsTVVWQ?type=png)

### Deployment Architecture (Production)
![Deployment Architecture](https://mermaid.ink/img/pako:eNpFjcFugzAMhl_F8mmTQGhXNHFgaA9QKk1a04NJXIiABJmkO7R994kBnQ_271_-P99Qe8OY42XwP7ojCXAslQMAmGPTCk0dHNgZltVc6lO8C-zMaRdQBwpWQ20DvzeSFQcmHaCJdjDn_1xJul9i24QvbqBmuVq9piqve5Yc6kmsa6H0Pmxpdka5VT5_pmlxz2iy2fXtvqPXk52fpgUcbVWeXpYOH4OP5u8hy8Dz_HrGBFuxBvMLDTMnOLKMtOx4W0gKQ8cjK8xBoSHpFSr3wAQnct_ej5gHiZyg-Nh2T0icDAWuLLVC4-Y-fgHXWXaI?type=png)

### CI/CD Pipeline
![CI/CD Pipeline](https://mermaid.ink/img/pako:eNo9jUFvgzAMhf-K5euodkdTpVVocNhhQj2NcHCJCxEkQU6yaar63ydCt5Of_d73fMPBa8YSr4v_HiaSCO-tcgAAFX91HylMED1YMq6Hw-EIddPVJjbpAq9DNN6Ffk_XTbbPHGLXJpdFeLnI8_FEw8xOwxO8iXeRnX4gWyRDjfdzdxYzjizQstMsmax4XfxPtv_ebDoze6zbB5ySWXQAchp2KPRY4ChGY3mlJXCBlsXStuNtq1IYJ7assASFmmRWqNwdC1zJfXpvsYySuEDxaZz-S9KqKXJlaBSyj-v9FxhLa3k?type=png)

---

## Technical Overview
### Authentication
- Stateless JWT authentication
- Token returned after login
- Required in ´Authorization: Bearer <token>´
- Logout invalidates stored token

### Authorization Model (RBAC)
The system implements a **database-driven Role-Based Access Control model**

![Authorization Model](https://mermaid.ink/img/pako:eNpFUMtugzAQ_BW0Z4KwjR3iQy7tsVGrSL1UXKx4A6hgo8WoD8S_FxyJ7mkemllpZrh5i6Dh3vmvW2MoJC_XyiXrvY9IyeFwTq6-w4e0oSi9IfXtOLbePYx_Hu3XAcmE3d1pNC_eTh1CCjW1FvTddCOm0K8NZuMwb6EKQoM9VqBXaA19VlC5ZQ0Nxn1434MONK0x8lPd7CXTYE3A59bUZPpdJXQW6clPLoBmiscS0DN8b5RlxangR85EqaRQKoWfTRbZqVSMlUKUPJdSLSn8xr95prgUknGZsyNTihUpoG2Dp8tjyTjo8geTJWkD?type=png)

This provides:
- Fine-grained endpoints protection
- No hardcoded role chekcs
- Fully scalable permission management
- Clean separation between security rules and business logic

### Database Migration

The project uses Flyway for version-controlled database schema management.

All database changes are applied automatically during application startup through migration scripts located in:

`src/main/resources/db/migration`

This approach provides:

- Version-controlled database evolution

- Repeatable and consistent schema creation

- Safe deployments across environments

- Automatic schema initialization when running the project locally

Flyway runs automatically when the backend starts, ensuring the database schema is always up to date.

---

## Tech Stack
### Back-End
- Java 17
- Spring Boot 3.4.2
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - Validation
- Hibernate
- MySQL
- Maven
- Lombok
- MapStruct
- JJWT

### Front-End
- TypeScript
- React 18
- Redux Toolkit
- Vite
- Axios
- React Hook Form + Yup
- Material UI
- Recharts

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- Render
- TiDB Cloud (Serverless, MySQL-compatible)

---

## Prerequisites
Before running the project locally, ensure the following tools are installed:

- **Java 17**
- **Node.js 18+**
- **Docker**
- **Docker Compose**
- **Git**

Optional but recommended:

- **Postman** or **Insomnia** for API testing
- **TablePlus** or **DBeaver** for database inspection

---

## Running Locally

The entire application stack (MySQL, backend API, and frontend) is containerized and can be started with Docker Compose.

### 1. Clone the repository
`git clone https://github.com/Facugl/banking_system.git
cd banking_system`

### 2. Configure environment variables

Create a `.env` file in the root directory of the project.

Example configuration:

```bash
SPRING_PROFILES_ACTIVE=dev

DB_HOST=mysql
DB_PORT=3306
DB_NAME=banking_system_db
DB_USERNAME=banking_user
DB_PASSWORD=banking_pass
MYSQL_ROOT_PASSWORD=root

JWT_SECRET=your-secret-key
JWT_EXPIRATION_MINUTES=30

VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### 3. Start the application

Run the following command from the root directory:

`docker compose up --build -d`

This will start three containers:

- MySQL Database

- Spring Boot Backend API

- React Frontend

### 4. Access the application

Once the containers are running, the services will be available at:

|Service|URL|
|-------|------|
|Frontend	| http://localhost:5173|
|Backend API |	http://localhost:8080/api/v1|

### 5. Stop the application

To stop all containers:

`docker compose down`

To also remove the database volume:

`docker compose down -v`

### Notes

- The backend waits for MySQL to become available using a Docker health check.

- The database schema is automatically managed with Flyway migrations.

- The React application communicates with the backend using the environment variable `VITE_API_BASE_URL`.

---

## Project Structure
The Backend is organized by **domain features**, not only technical layers.

Each feature contains:
- controller
- service
- dto (request/response)
- persistence (entity + repository)
- exception (if needed)

### Example Structure

```bash
accounts/
   controller/
   dto/
   persistence/
   service/
   exception/
auth/
transactions/
users/
admin/
```

This improves:
- Maintainability
- Scalability
- Clear domain boundaries
- Easier onboarding for new developers

---

## Permissions Table

The system implements **database-driven Role-Based Access Control (RBAC)**. Permissions are defined dynamically through the `modules`, `operations`, and `permissions` tables instead of static annotations.

### Roles

- **ADMINISTRATOR** – Full access to all operations.
- **EMPLOYEE** – Operational banking access.
- **CUSTOMER** – Limited access to their own banking resources.
- Note: Some restrictions such as "only their own accounts" are enforced at the service layer, not directly in the RBAC table.

### Permissions Matrix

| **Module**      | **Operation**             | **Administrator** | **Employee** | **Customer**                                                 |
| --------------- | ------------------------- | ----------------- | ------------ | ------------------------------------------------------------ |
| **Account**     | Create account            | ✅                | ✅           | ✅                                                           |
|                 | Get one account            | ✅                | ✅           | ✅                                                           |
|                 | Get all accounts          | ✅                | ✅           | ✅ (only their own accounts)                                 |
|                 | Update account            | ✅                | ✅           | ❌                                                           |
|                 | Update account status     | ✅                | ✅           | ✅                                                           |
|                 | Delete account            | ✅                | ❌           | ❌                                                           |
|                 | Deposit into account      | ✅                | ✅           | ✅ (only to their own accounts)                              |
|                 | Withdraw from account     | ✅                | ✅           | ✅ (only from their own accounts with sufficient balance)    |
|                 | Transfer between accounts | ✅                | ✅           | ✅ (only from their own accounts to other existing accounts) |
|                 | Check account balance     | ✅                | ✅           | ✅ (only their own accounts)                                 |
| **Transaction** | Get one transaction       | ✅                | ✅           | ✅                                                           |
|                 | Get all transactions      | ✅                | ✅           | ✅ (only transactions related to their accounts)             |
| **User**        | Register user             | ✅                | ✅           | ✅ (public endpoint)                                         |
| **Auth**        | Authenticate              | ✅                | ✅           | ✅ (public endpoint)                                         |
|                 | Validate token            | ✅                | ✅           | ✅ (public endpoint)                                         |
|                 | Get my profile            | ✅                | ✅           | ✅                                                           |
|                 | Logout                    | ✅                | ✅           | ✅ (public endpoint)                                         |
| **Module**      | Create module             | ✅                | ❌           | ❌                                                           |
|                 | Get one module            | ✅                | ❌           | ❌                                                           |
|                 | Get all modules           | ✅                | ❌           | ❌                                                           |
|                 | Update module             | ✅                | ❌           | ❌                                                           |
|                 | Delete module             | ✅                | ❌           | ❌                                                           |
| **Operation**   | Create operation          | ✅                | ❌           | ❌                                                           |
|                 | Get one operation         | ✅                | ❌           | ❌                                                           |
|                 | Get all operations        | ✅                | ❌           | ❌                                                           |
|                 | Update operation          | ✅                | ❌           | ❌                                                           |
|                 | Delete operation          | ✅                | ❌           | ❌                                                           |
| **Permission**  | Create permission         | ✅                | ❌           | ❌                                                           |
|                 | Get one permission        | ✅                | ❌           | ❌                                                           |
|                 | Get all permissions       | ✅                | ❌           | ❌                                                           |
|                 | Delete permission         | ✅                | ❌           | ❌                                                           |
| **Role**        | Create role               | ✅                | ❌           | ❌                                                           |
|                 | Get one role              | ✅                | ❌           | ❌                                                           |
|                 | Get all roles             | ✅                | ❌           | ❌                                                           |
|                 | Update role               | ✅                | ❌           | ❌                                                           |
|                 | Delete role               | ✅                | ❌           | ❌                                                           |
| **Statistics**  | Get statistics            | ✅                | ❌           | ❌                                                           |

---

## API Documentation

Below are three practical examples using the initial data.

### Authenticate User

- **URL**: `{BASE_URL}/api/v1/auth/authenticate`
- **Description**: Authenticates a user and returns a JWT token for subsequent requests.
- **Method**: POST
- **Headers**:
  - _Content-Type_: `application/json`. Mandatory
- **Request Body**:
  - **username**: The user's unique username. Mandatory. Cannot be blank.
  - **password**: The user's password. Mandatory. Cannot be blank.
- **Example Usage (CURL)**:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
    "username": "sakura",
    "password": "Sakura_123456"
}' \
"http://localhost:8080/api/v1/auth/authenticate"
```

- **Response**:

  - **200 (Ok)**: Returns a JWT token for the authenticated user.
    - **Example**:
      ```json
      {
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```
  - **401 (Unauthorized)**: If the username does not exist or the password is incorrect. Both cases return the same generic message, to avoid leaking which usernames exist.
    - **Example**:
      ```json
      {
        "frontendMessage": "Invalid username or password.",
        "backendMessage": "Bad credentials",
        "status": 401,
        "path": "/api/v1/auth/authenticate",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```

  - **Note**: Use the returned token in the `Authorization` header as `Bearer <token>`.

### Transfer Money Between Accounts

- **URL**: `{BASE_URL}/api/v1/accounts/transfer`
- **Description**: Transfers money between accounts using the initial data from `data.sql`. This operation persists a `Transaction` entity in the database to log the activity.
- **Method**: POST
- **Headers**:
  - _Content-Type_: `application/json`. Mandatory.
  - _Authorization_: `Bearer <JWT_TOKEN>`. Mandatory (obntained from the authentication endpoint)
- **Request Body**:
  - **sourceAccountNumber**: Source account number. Mandatory. Cannot be blank.
  - **targetAccountNumber**: Target account number. Mandatory. Cannot be blank.
  - **amount**: Amount to transfer. Mandatory. Cannot be blank.
  - **comment**: Optional comment for the transaction.
- **Example Usage (CURL)**:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-d '{
    "sourceAccountNumber": "76591142607308616612",
    "targetAccountNumber": "114087875602508931",
    "amount": 1000.00,
    "comment": "Transfer between Sakura accounts"
}' \
"http://localhost:8080/api/v1/accounts/transfer"
```

- **Response**:
  - **200 (Ok)**: Transfer successful, with the generated transaction details.
    - **Example**:
      ```json
      {
        "transactionNumber": "123456789012",
        "sourceAccount": {
          "id": 3,
          "accountNumber": "76591142607308616612",
          "balance": 9000.0
        },
        "targetAccount": {
          "id": 2,
          "accountNumber": "114087875602508931",
          "balance": 6000.0
        },
        "amount": 1000.0,
        "transactionDate": "2025-03-30T13:24:12",
        "type": "TRANSFER",
        "comment": "Transfer between Sakura accounts"
      }
      ```
  - **400 (Bad Request)**: If the amount exceeds the balance or is invalid.
    - **Example**:
      ```json
      {
        "frontendMessage": "An unexpected error occurred. Please try again.",
        "backendMessage": "Insufficient founds.",
        "status": 400,
        "path": "/api/v1/accounts/transfer",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```
  - **401 (Unauthorized)**: If the token is missing or invalid.
    - **Example**:
      ```json
      {
        "frontendMessage": "No authentication credentials were found. Please log in.",
        "backendMessage": "Bad credentials.",
        "status": 401,
        "path": "/api/v1/accounts/transfer",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```
  - **403 (Forbidden)**: If the user has no authority.
    - **Example**:
      ```json
      {
        "frontendMessage": "No authentication credentials were found. Please log in.",
        "backendMessage": "Forbidden.",
        "status": 403,
        "path": "/api/v1/accounts/transfer",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```
  - **404 (Not Found)**: If an account does not exist.
    - **Example**:
      ```json
      {
        "frontendMessage": "The requested resource was not found.",
        "backendMessage": "Source account not found.",
        "status": 404,
        "path": "/api/v1/accounts/transfer",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```
  - **500 (Internal Server Error)**: If there are any error.
    - **Example**:
      ```json
      {
        "frontendMessage": "An unexpected error occurred. Please try again.",
        "backendMessage": "Bad credentials.",
        "status": 500,
        "path": "/api/v1/accounts/transfer",
        "timestamp": "2025/03/25 13:24:12"
      }
      ```

### Logout User

- **URL**: `{BASE_URL}/api/v1/auth/logout`
- **Description**: Logs out the user by invalidating the JWT Token.
- **Method**: POST
- **Headers**:
  - _Authorization_: `Bearer <JWT_TOKEN>`. No mandatory (obtained from the authentication endpoint)
- **Example Usage (CURL)**:

```bash
curl -X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
"http://localhost:8080/api/v1/auth/logout"
```

- **Response**:
  - **200 (Ok)**: Logout successful.
    - **Example**:
      ```json
      {
        "message": "Logout successful."
      }
      ```

