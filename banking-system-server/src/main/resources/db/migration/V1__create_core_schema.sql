CREATE TABLE modules (
  id BIGINT NOT NULL AUTO_INCREMENT,
  base_path VARCHAR(255),
  name VARCHAR(255),
  PRIMARY KEY (id),
  CONSTRAINT uk_module_base_path UNIQUE (base_path),
  CONSTRAINT uk_module_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE roles (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  PRIMARY KEY (id),
  CONSTRAINT uk_role_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  password VARCHAR(255),
  username VARCHAR(255),
  roles_id BIGINT,
  PRIMARY KEY (id),
  CONSTRAINT uk_user_username UNIQUE (username),
  CONSTRAINT fk_user_role FOREIGN KEY (roles_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE operations (
  id BIGINT NOT NULL AUTO_INCREMENT,
  permit_all BIT(1),
  modules_id BIGINT,
  http_method VARCHAR(255),
  name VARCHAR(255),
  path VARCHAR(255),
  PRIMARY KEY (id),
  CONSTRAINT uk_operation UNIQUE (path, http_method, modules_id),
  CONSTRAINT fk_operation_module FOREIGN KEY (modules_id) REFERENCES modules(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE permissions (
  id BIGINT NOT NULL AUTO_INCREMENT,
  operations_id BIGINT,
  roles_id BIGINT,
  PRIMARY KEY (id),
  CONSTRAINT uk_permission UNIQUE (roles_id, operations_id),
  CONSTRAINT fk_permission_operation FOREIGN KEY (operations_id) REFERENCES operations(id),
  CONSTRAINT fk_permission_role FOREIGN KEY (roles_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE accounts (
  id BIGINT NOT NULL AUTO_INCREMENT,
  account_number VARCHAR(255) NOT NULL,
  balance DECIMAL(38,2) NOT NULL,
  created_at DATETIME(6) NOT NULL,
  status ENUM('ACTIVE','BLOCKED','CLOSED','INACTIVE') NOT NULL,
  type ENUM('CHECKING','SAVINGS') NOT NULL,
  users_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT uk_account_number UNIQUE (account_number),
  CONSTRAINT fk_account_user FOREIGN KEY (users_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE transactions (
  id BIGINT NOT NULL AUTO_INCREMENT,
  amount DECIMAL(38,2) NOT NULL,
  comment VARCHAR(255),
  transaction_date DATETIME(6) NOT NULL,
  transaction_number VARCHAR(255) NOT NULL,
  type ENUM('DEPOSIT','TRANSFER','WITHDRAW') NOT NULL,
  source_account_id BIGINT,
  target_account_id BIGINT,
  PRIMARY KEY (id),
  CONSTRAINT uk_transaction_number UNIQUE (transaction_number),
  CONSTRAINT fk_transaction_source FOREIGN KEY (source_account_id) REFERENCES accounts(id),
  CONSTRAINT fk_transaction_target FOREIGN KEY (target_account_id) REFERENCES accounts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE jwt_tokens (
  id BIGINT NOT NULL AUTO_INCREMENT,
  expiration DATETIME(6),
  is_valid BIT(1) NOT NULL,
  token TEXT NOT NULL,
  users_id BIGINT,
  PRIMARY KEY (id),
  CONSTRAINT fk_token_user FOREIGN KEY (users_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;