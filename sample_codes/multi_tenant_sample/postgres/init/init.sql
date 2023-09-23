CREATE USER docker WITH PASSWORD 'docker';

CREATE DATABASE docker;

GRANT ALL PRIVILEGES ON DATABASE docker to docker;

\c docker

CREATE TABLE accounts (
    account_id serial PRIMARY KEY,
    name varchar(30) NOT NULL UNIQUE,
    tenant_id integer
);

GRANT ALL PRIVILEGES ON TABLE accounts to docker;

INSERT INTO accounts(name, tenant_id) VALUES ('account1', 1);
INSERT INTO accounts(name, tenant_id) VALUES ('account2', 4);
INSERT INTO accounts(name, tenant_id) VALUES ('account3', 1);
INSERT INTO accounts(name, tenant_id) VALUES ('account4', 2);
INSERT INTO accounts(name, tenant_id) VALUES ('account5', 3);
INSERT INTO accounts(name, tenant_id) VALUES ('account6', 2);
INSERT INTO accounts(name, tenant_id) VALUES ('account7', 3);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON accounts 
USING (tenant_id = current_setting('current_tenant_id')::INTEGER);