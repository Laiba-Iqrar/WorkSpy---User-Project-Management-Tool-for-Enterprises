-- Drop tables if they already exist
DROP TABLE IF EXISTS task_status_changes;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS approvals;
DROP TABLE IF EXISTS timesheets;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- 1. users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('employee', 'manager') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. projects Table
CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    milestone VARCHAR(255),
    deadline DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    FOREIGN KEY (created_by) REFERENCES users(user_id),

);

-- 3. tasks Table (Referencing both users and projects tables)
C-- 3. tasks Table (Referencing both users and projects tables)
CREATE TABLE tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    assign_by INT,
    task_description TEXT NOT NULL,
    status ENUM('Not Started', 'In Progress', 'Completed') DEFAULT 'Not Started',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (assign_by) REFERENCES users(user_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
    
);


-- 4. timesheets Table (Referencing users and tasks tables)
CREATE TABLE timesheets (
    timesheet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    total_hours DECIMAL(5,2) NOT NULL,
    status ENUM('In Progress', 'Not Started', 'Completed') DEFAULT 'In Progress',
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

-- 5. approvals Table (Referencing users and timesheets tables)
CREATE TABLE approvals (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    timesheet_id INT NOT NULL,
    manager_id INT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    comments TEXT,
    approval_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (timesheet_id) REFERENCES timesheets(timesheet_id),
    FOREIGN KEY (manager_id) REFERENCES users(user_id)
);

-- 6. leave_requests Table (Referencing users table)
CREATE TABLE leave_requests (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    leave_type ENUM('sick', 'vacation', 'personal') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    approval_date DATETIME,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

-- 7. task_status_changes Table (Referencing users and tasks tables)
CREATE TABLE task_status_changes (
    change_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    previous_status ENUM('Not Started', 'In Progress', 'Completed') NOT NULL,
    new_status ENUM('Not Started', 'In Progress', 'Completed') NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    changed_by INT,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (changed_by) REFERENCES users(user_id)
);


-- Insert into users table
INSERT INTO users (first_name, last_name, email, password, role)
VALUES 
('John', 'Doe', 'johndoe@example.com', 'hashed_password_1', 'employee'),
('Jane', 'Smith', 'janesmith@example.com', 'hashed_password_2', 'employee'),
('Michael', 'Johnson', 'michaeljohnson@example.com', 'hashed_password_3', 'manager'),
('Emily', 'Davis', 'emilydavis@example.com', 'hashed_password_4', 'manager');

-- Insert into projects table
INSERT INTO projects (project_name, description, milestone, deadline)
VALUES 
('Project Alpha', 'Project Alpha Description', 'Phase 1', '2024-12-31'),
('Project Beta', 'Project Beta Description', 'Phase 2', '2025-06-30');

-- Insert into tasks table
INSERT INTO tasks (project_id, user_id, assign_by, task_description, status, created_by, updated_by)
VALUES 
(1, 1, 3, 'Task 1 for Project Alpha', 'In Progress', 3, 3),
(1, 2, 3, 'Task 2 for Project Alpha', 'Not Started', 3, 3),
(2, 1, 4, 'Task 1 for Project Beta', 'Not Started', 4, 4),
(2, 2, 4, 'Task 2 for Project Beta', 'Completed', 4, 4);

-- Insert into timesheets table
INSERT INTO timesheets (user_id, task_id, total_hours, status, comments, created_by, updated_by)
VALUES 
(1, 1, 8.5, 'In Progress', 'Initial work on Task 1', 3, 3),
(2, 2, 4.0, 'Completed', 'Completed Task 2', 3, 3),
(1, 3, 5.0, 'Not Started', 'No hours yet', 4, 4),
(2, 4, 10.0, 'Completed', 'Completed Task 2 for Project Beta', 4, 4);

-- Insert into approvals table
INSERT INTO approvals (timesheet_id, manager_id, status, comments)
VALUES 
(1, 3, 'pending', 'Review needed'),
(2, 3, 'approved', 'Approved with comments'),
(3, 4, 'rejected', 'Not enough details provided'),
(4, 4, 'approved', 'Reviewed and approved');

-- Insert into leave_requests table
INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason, status, created_by, updated_by)
VALUES 
(1, 'sick', '2024-11-01', '2024-11-03', 'Flu', 'approved', 3, 3),
(2, 'vacation', '2024-12-15', '2024-12-20', 'Family trip', 'pending', 3, 3),
(1, 'personal', '2025-01-10', '2025-01-12', 'Personal matters', 'approved', 4, 4),
(2, 'sick', '2024-11-05', '2024-11-06', 'Cold', 'rejected', 4, 4);

-- Insert into task_status_changes table
INSERT INTO task_status_changes (task_id, previous_status, new_status, changed_by)
VALUES 
(1, 'Not Started', 'In Progress', 3),
(2, 'Not Started', 'In Progress', 3),
(2, 'In Progress', 'Completed', 4),
(4, 'Not Started', 'Completed', 4);
