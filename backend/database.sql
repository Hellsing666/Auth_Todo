-- Database Schema for Authenticated Todo List Application

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing todo table if it exists (to recreate with user_id)
DROP TABLE IF EXISTS todo;

-- Create todo table with user_id foreign key
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(10) DEFAULT 'medium',
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_todo_user_id ON todo(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Display success message
SELECT 'Database schema created successfully!' AS status;
