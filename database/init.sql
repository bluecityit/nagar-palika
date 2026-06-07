-- Create the database if it doesn't exist (for local setups)
CREATE DATABASE IF NOT EXISTS ajmer_municipal;
USE ajmer_municipal;

-- 1. Users Table (For Admin Staff)
CREATE TABLE IF NOT EXISTS users_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user. 
-- Username: admin
-- Password: password123 (Hashed using bcrypt)
INSERT INTO users_table (username, password_hash) 
VALUES ('admin', '$2b$10$X7/8t./R.3b.mQYg.v.A.O2uC9V9C.Xg.X.X.X.X.X.X.X.X.X.X.X'); 
-- Note: In production, generate a real hash for your passwords.

-- 2. Tenders Table
CREATE TABLE IF NOT EXISTS tenders_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publish_date DATE NOT NULL,
    closing_date DATE NOT NULL,
    file_url VARCHAR(255),
    status ENUM('Active', 'Closed') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample tender
INSERT INTO tenders_table (title, description, publish_date, closing_date, status)
VALUES ('Road Repair in Ward 5', 'Repairing of main road from Station to Clock Tower', '2026-05-20', '2026-06-20', 'Active');

-- 3. Birth Certificates Table
CREATE TABLE IF NOT EXISTS birth_certificates_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    mother_name VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL
);

-- Insert sample birth certificate for testing
INSERT INTO birth_certificates_table (registration_no, name, gender, dob, father_name, mother_name, issue_date)
VALUES ('B-2026-001', 'Rahul Sharma', 'Male', '2026-01-15', 'Amit Sharma', 'Priya Sharma', '2026-02-01');

-- 4. Death Certificates Table
CREATE TABLE IF NOT EXISTS death_certificates_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(50) NOT NULL UNIQUE,
    deceased_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dod DATE NOT NULL,
    father_husband_name VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL
);

-- Insert sample death certificates for testing
INSERT INTO death_certificates_table (registration_no, deceased_name, gender, dod, father_husband_name, issue_date)
VALUES 
('D-2026-001', 'Ramesh Patel', 'Male', '2026-03-10', 'Suresh Patel', '2026-03-25'),
('D-2026-002', 'Sunita Verma', 'Female', '2026-04-05', 'Rajesh Verma', '2026-04-12'),
('D-2025-104', 'Kishan Lal', 'Male', '2025-11-20', 'Mohan Lal', '2025-12-01');

-- Insert more sample birth certificates for testing
INSERT INTO birth_certificates_table (registration_no, name, gender, dob, father_name, mother_name, issue_date)
VALUES 
('B-2026-002', 'Aarav Gupta', 'Male', '2026-02-20', 'Rohan Gupta', 'Neha Gupta', '2026-03-01'),
('B-2026-003', 'Diya Singh', 'Female', '2026-04-10', 'Vikram Singh', 'Anjali Singh', '2026-04-25'),
('B-2025-089', 'Kabir Khan', 'Male', '2025-09-15', 'Imran Khan', 'Sana Khan', '2025-10-05');