DROP DATABASE IF EXISTS
employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREAMENT PRIMARY KEY,
    department_name VARCHAR (255) NOT NULL
);
CREATE TABLE roles (
    id INTNOT NULL AUTO_INCREAMENT PRIMARY KEY,
    title VARCHAR(255),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE empoyee (
    id INT NOT NULL AUTO_INCREAMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NOT NULL
);