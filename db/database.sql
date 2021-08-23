CREATE DATABASE jet_city;

--\c into jet_city

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
            REFERENCES clients(id)
            ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--References Parent table projects

CREATE TABLE workstations(
    id SERIAL NOT NULL PRIMARY KEY,
    project_id INT NOT NULL,
    name VARCHAR(255),
    origin VARCHAR(255),
    destination VARCHAR(255),
    monitors INT,
    docking_stations INT,
    computers INT,
    keyboards INT,
    mice INT,
    CONSTRAINT fk_project
        FOREIGN KEY(project_id) 
            REFERENCES projects(id)
            ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);