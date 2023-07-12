
--- View all roles --

SELECT 
roles.id AS role_id,
roles.role_title, 
roles.salary,
department.department_name
FROM roles
JOIN department 
ON roles.department_id = department.id;



-- View all employees --

SELECT 
a.id AS employee_id, a.first_name, a.last_name, 
c.role_title,
d.department_name,
c.salary,
b.first_name AS manager_firstname,
b.last_name AS manager_lastname
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id;

-- View employees by manager --

SELECT 
b.first_name AS manager_firstname,
b.last_name AS manager_lastname,
a.id AS employee_id, a.first_name, a.last_name, 
c.role_title,
d.department_name,
c.salary
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id
WHERE b.first_name = "John" AND b.last_name = "McKensy";

-- get manager names --

SELECT 
concat(b.first_name, " ", b.last_name) AS manager_name
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id
WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;

--View employees by department --

SELECT 
a.id AS employee_id,
a.first_name,
a.last_name, 
c.role_title,
d.department_name,
c.salary,
b.first_name AS manager_firstname,
b.last_name AS manager_lastname
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id
WHERE d.department_name = "Production";

-- Add department --

INSERT INTO department (department_name)
VALUES ("Product");

-- Add a role --

INSERT INTO roles (role_title, salary, department_id)
VALUES ("Product Manager", 200000, 1);

-- Add an employee --

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Micheal", "Dean", 2, 1);


-- deleting specific values --

DELETE FROM department WHERE department_name = "Legal";