CREATE DATABASE jet_city;

--\c into jet_city

CREATE TABLE clients(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--References Parent table clients

CREATE TABLE projects(
    id SERIAL NOT NULL PRIMARY KEY,
    client_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
            REFERENCES clients(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);