# Banking System

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Technologies Used](#technologies-used)
  - [Back-End](#back-end)
  - [Front-End](#front-end)
  - [Others](#others)
- [Folder Structure](#folder-structure)
  - [Back-End](#back-end-1)
  - [Front-End](#front-end-1)
- [Permissions Table](#permissions-table)
- [Running the Project with Docker Compose](#running-the-project-with-docker-compose)
- [Configuration](#configuration)
- [Base URL](#base-url)
- [Initial Data](#initial-data)
- [API Documentation](#api-documentation)
  - [Authenticate User](#authenticate-user)
  - [Transfer Money Between Accounts](#transfer-money-between-accounts)
  - [Logout User](#logout-user)
- [Full Documentation](#full-documentation)
- [Security Notes](#security-notes)

---

## Project Overview

The Banking System is a banking system designed to manage accounts, transactions, and user authentication with distinct roles (Administrator, Employee, Customer). It allows operations such as creating accounts, checking balances, making deposits, withdrawals, and transfers, with a role-based permission system to ensure security and controlled access.

Each financial operation (deposit, withdrawal, transfer) generates a `Transaction` entity that is persisted in the database, providing a complete history of account activities. The project consists of a backend RESTful API developed in Java with Spring Boot and a frontend built with React and Redux for state management. The database (MySQL) is initialized with test data via a `data.sql` file.

---

## Prerequisites

- Java 17
- Node.js 18+
- Docker and Docker Compose

---

## Technologies Used

### Back-End

- **Language**: Java 17
- **Frameworks**: Spring Boot 3.4.2
  - **Spring Boot Starter Web**: For the REST API.
  - **Spring Boot Starter Data JPA**: Persistence with Hibernate.
  - **Spring Boot Starter Security**: Authentication and Authorization with JWT.
  - **Spring Boot Starter Validation**: Data validation.
- **Database**: MySQL (using `mysql-connector-j`)
- **Dependencies**:
  - **Lombok (1.18.30)**: Reduces boilerplate code.
  - **MapStruct (1.5.2.Final)**: Mapping between entities and DTO's.
  - **JJWT (0.12.6)**: JWT token generation and handling.
  - **Jackson Datatype JSR310 (2.15.2)**: Support for Java 8+ dates.
- **Build Tool**: Maven.

### Front-End

- **Language**: TypeScript 5.6.2
- **Library**: React 18.3.1
- **State management**: Redux Toolkit (2.5.0) with React-Redux (9.2.0)
- **Dependencies**:
  - **Axios (1.7.9)**: HTTP request to the backend.
  - **React Hook Form (7.54.2) + Yup (1.6.1)**: Forms and Validations.
  - **Material-UI (6.4.1)**: UI Components.
  - **Recharts (2.15.0)**: Statistical charts.
  - **React Router DOM (7.1.2)**: Routing.
  - **JWT Decode (4.0.0)**: JWT token decoding.
- **Build Tool**: Vite 6.0.5
- **Dev Tools**:
  - **ESLint (9.18.0) + Plugins**: Linting and React/TS rules.
  - **Prettier (3.4.2)**: Code formatting.
  - **TypeScript ESLint**: TypeScript support.

### Others

- **Containerization**: Docker and Docker Compose.
- **Development Tools**: Insomnia (API testing and documentation)

---

## Folder Structure

### Back-End

```bash
├───main
│   ├───java
│   │   └───com
│   │       └───facugl
│   │           └───banking_system_server
│   │               ├───accounts
│   │               │   ├───controller
│   │               │   ├───dto
│   │               │   │   ├───request
│   │               │   │   └───response
│   │               │   ├───exception
│   │               │   ├───persistence
│   │               │   │   ├───entity
│   │               │   │   └───repository
│   │               │   └───service
│   │               ├───admin
│   │               │   ├───modules
│   │               │   │   ├───controller
│   │               │   │   ├───dto
│   │               │   │   │   ├───request
│   │               │   │   │   └───response
│   │               │   │   ├───exception
│   │               │   │   ├───persistence
│   │               │   │   │   ├───entity
│   │               │   │   │   └───repository
│   │               │   │   └───service
│   │               │   ├───operations
│   │               │   │   ├───controller
│   │               │   │   ├───dto
│   │               │   │   │   ├───request
│   │               │   │   │   └───response
│   │               │   │   ├───exception
│   │               │   │   ├───persistence
│   │               │   │   │   ├───entity
│   │               │   │   │   └───repository
│   │               │   │   └───service
│   │               │   ├───permissions
│   │               │   │   ├───controller
│   │               │   │   ├───dto
│   │               │   │   │   ├───request
│   │               │   │   │   └───response
│   │               │   │   ├───exception
│   │               │   │   ├───persistence
│   │               │   │   │   ├───entity
│   │               │   │   │   └───repository
│   │               │   │   └───services
│   │               │   ├───roles
│   │               │   │   ├───controller
│   │               │   │   ├───dto
│   │               │   │   │   ├───request
│   │               │   │   │   └───response
│   │               │   │   ├───exception
│   │               │   │   ├───persistence
│   │               │   │   │   ├───entity
│   │               │   │   │   └───repository
│   │               │   │   └───service
│   │               │   └───statistics
│   │               │       ├───controller
│   │               │       ├───dto
│   │               │       │   └───response
│   │               │       └───service
│   │               ├───auth
│   │               │   ├───controller
│   │               │   ├───dto
│   │               │   │   ├───request
│   │               │   │   └───response
│   │               │   ├───persistence
│   │               │   │   ├───entity
│   │               │   │   └───repository
│   │               │   └───service
│   │               │       └───impl
│   │               ├───common
│   │               │   ├───handler
│   │               │   ├───utils
│   │               │   └───validation
│   │               ├───config
│   │               │   └───security
│   │               │       ├───authorization
│   │               │       ├───filter
│   │               │       └───handler
│   │               ├───transactions
│   │               │   ├───controller
│   │               │   ├───dto
│   │               │   │   └───response
│   │               │   ├───exception
│   │               │   ├───persistence
│   │               │   │   ├───entity
│   │               │   │   └───repository
│   │               │   └───service
│   │               └───users
│   │                   ├───controller
│   │                   ├───dto
│   │                   │   ├───request
│   │                   │   └───response
│   │                   ├───exception
│   │                   ├───persistence
│   │                   │   ├───entity
│   │                   │   └───repository
│   │                   └───service
│   └───resources
│       ├───static
│       └───templates
└───test
    └───java
        └───com
            └───facugl
                └───banking_system_server
                    ├───accounts
                    │   ├───controller
                    │   └───service
                    └───common
                        └───utils
```

#### Description

- `accounts`: Account management (CRUD and financial operations).
- `admin`: Admin-specific modules:
  - `modules`: Module management.
  - `operations`: Operation management.
  - `permissions`: Permission management.
  - `roles`: Role management.
  - `statistics`: Statistical data handling.
- `auth`: Authentication and JWT handling.
- `common`: Shared utilities (handlers, validations).
- `config/security`: Security configuration (filters, authorization).
- `transactions`: Transaction logging and retrieval.
- `users`: Customer management.
- `resources`: Configuration files and `data.sql`.

### Front-End

```bash
├───components
├───features
│   ├───accounts
│   │   ├───components
│   │   ├───services
│   │   ├───thunks
│   │   └───views
│   ├───auth
│   │   ├───components
│   │   ├───services
│   │   ├───thunks
│   │   └───validation
│   ├───customer
│   │   └───views
│   ├───modules
│   │   ├───components
│   │   ├───services
│   │   ├───thunks
│   │   ├───validation
│   │   └───views
│   ├───roles
│   │   ├───components
│   │   ├───services
│   │   ├───thunks
│   │   ├───validation
│   │   └───views
│   ├───statistics
│   │   ├───components
│   │   ├───hooks
│   │   ├───services
│   │   ├───thunks
│   │   └───views
│   └───transactions
├───pages
├───routes
├───services
├───store
├───styles
└───utils
```

#### Description

- `components`: Reusable components.
- `features`: Functional modules:
  - `accounts`: Account management.
  - `auth`: Authentication and validation.
  - `customer`: Customer views.
  - `modules`, `roles`: Module and Role management.
  - `statistics`: Statistics visualization.
  - `transactions`: Transaction management.
- `pages`: Main pages.
- `routes`: Routing configurations.
- `services`: API communication logic.
- `store`: Redux configuration.
- `styles`: Global styles.
- `utils`: General utilities.

---

## Permissions Table

The system uses Role-Based Access Control (RBAC):

| **Module**      | **Operation**             | **Administrator** | **Employee** | **Customer**                                                 |
| --------------- | ------------------------- | ----------------- | ------------ | ------------------------------------------------------------ |
| **Account**     | Create account            | ✅                | ✅           | ✅                                                           |
|                 | Get one accoun            | ✅                | ✅           | ✅                                                           |
|                 | Get all accounts          | ✅                | ✅           | ✅ (only their own accounts)                                 |
|                 | Update account            | ✅                | ✅           | ❌                                                           |
|                 | Update account status     | ✅                | ✅           | ✅                                                           |
|                 | Delete account            | ✅                | ❌           | ❌                                                           |
|                 | Deposit into account      | ✅                | ✅           | ✅ (only to their own accounts)                              |
|                 | Withdraw fron account     | ✅                | ✅           | ✅ (only from their own accounts with sufficient balance)    |
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

## Running the project with Docker Compose

- **1. Requirements**:
  - Docker and Docker Compose installed.
  - Ports 3000 (Front-End), 8080 (Back-End) and 3306 (database) available.
- **2. Run**:

```bash
docker-compose up --build
```

This builds and starts the containers for the Front-End, Back-End and MySQL.

- **3 Local URL's**:
  - Front-End: `http://localhost:3000`
  - Back-End (API): `http://localhost:8080`
- **4. Stop**:

```bash
docker-compose up --build
```

To remove volumes: `docker-compose down -v`.

---

### Configuration

The backend uses `application.yml` for configuration. Default settings include:

```yml
server:
  servlet:
    context-path: /api/v1
spring:
  application:
    name: banking-system-server
  datasource:
    url: jdbc:mysql://localhost:3306/banking_system
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  sql:
    init:
      mode: always
  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true
    defer-datasource-initialization: true
    properties:
      hibernate:
        format_sql: true
security:
  default:
    role: "CUSTOMER"
  jwt:
    expiration-in-minutes: 30
```

For deployment, you can override settings (e.g., database credentials) using a `.env` file in the backend root directory:

- 1. Create a `.env` file.

```env
  DB_USERNAME=your_username
  DB_PASSWORD=your_password
  DB_HOST=your_db_host
  DB_PORT=3306
  DB_NAME=banking_system
```

- 2. Update `application.yml` to use these variables.

```yml
spring:
datasource:
  url: jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
  username: ${DB_USERNAME}
  password: ${DB_PASSWORD}
```

- 3. Ensure your `docker-compose.yml` loads the `.env` file. Example:

```yml
version: "3.8"
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    env_file:
      - .env
    depends_on:
      - db
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
volumes:
  db-data:
```

Run with `docker-compose up --build`.

_Note_: The JWT secret key is generated dynamically on each server startup and does not use environment variables unless the code is modified (see Security Notes (#security-notes)).

---

## Base URL

The base URL (`{BASE_URL}`) depends on the environment:

- **Local (with Docker Compose)**: `http://localhost:8080`
- **Production**: Hosting service domain (e.g., `https://my-backend.onrender.com`).

---

## Initial Data

The `data.sql` file loads initial data into the database. Below is a subset for testing authentication and transfer:

- **User**:
  - `username: "sakura"`, `name: "Sakura"`, `password: "$2a$10$XDu.VeK6B/7G0GBm257rIu3R7pwXygAVpHotsy4x98KSF22Bdea0G"`, `role: "CUSTOMER"`.
- **Accounts** (owned by Sakura):
  - `accountNumber: "76591142607308616612"`, `balance: 10000.00`, `type: "CHECKING"`, `status: "ACTIVE"`.
  - `accountNumber: "114087875602508931"`, `balance: 5000.00`, `type: "CHECKING"`, `status: "ACTIVE"`.

---

## API Documentation

Below are three practical examples using the initial data. For complete endpoint details, refer to Full Documentation (#full-documentation).

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
  - **500 (Internal Server Error)**: If the the username or password is incorrect.

    - **Example**:
      ```json
      {
        "frontendMessage": "An unexpected error occurred. Please try again.",
        "backendMessage": "Bad credentials.",
        "status": 500,
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
  - **403 (Forbiden)**: If the user has no authority.
    - **Example**:
      ```json
      {
        "frontendMessage": "No authentication credentials were found. Please log in.",
        "backendMessage": "Forbiden.",
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

## Full Documentation

For complete documentation of all endpoints (creating accounts, checking balances, deposits, withdrawals, etc.), refer to the `openapi.json` (./openapi.json) file. This file was generated with Insomnia and contains the full API specification. To use it:

- 1. Download the file from the repository.
- 2. Load it into Swagger UI or Postman.
- 3. Replace `{BASE_URL}` with the appropiate URL based on your environment.

## Security Notes

- Change default passwords in `data.sql` before deploying to production to prevent unauthorized access.
- The JWT secret key is generated dynamically on each server startup using `Jwts.SIG.HS256.key().build()`. This means:
  - All existing JWT tokens become invalid after a server restart, requiring users to re-authenticate.
  - In a single-instance deployment (e.g., one Docker container), this is acceptable if session interruptions on restart are tolerable.
  - In a multi-instance deployment (e.g., multiple Docker containers), each instance will have a different key, breaking token consistency across instances. For multi-instance setups, a static key shared via an environment variable (e.g., `JWT_SECRET`) would be needed, but this requires code changes not implemented here.
