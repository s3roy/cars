// -- Create the database
// CREATE DATABASE IF NOT EXISTS car_management;

// -- Use the database
// USE car_management;

// -- Users Table
// CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Cars Table
// CREATE TABLE IF NOT EXISTS cars (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     brand VARCHAR(100) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     engine_type VARCHAR(50) NOT NULL,
//     transmission VARCHAR(50) NOT NULL,
//     seats INT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Transactions Table
// CREATE TABLE IF NOT EXISTS transactions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     car_id INT NOT NULL,
//     transaction_type ENUM('buy', 'test_drive') NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
// );

// -- Reviews Table
// CREATE TABLE IF NOT EXISTS reviews (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     car_id INT NOT NULL,
//     rating INT CHECK (rating BETWEEN 1 AND 5),
//     review TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
// );
