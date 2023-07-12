INSERT INTO department (department_name)
VALUES ("Production"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (role_title, salary, department_id)
VALUES ("Product Manager", 200000, 1),
       ("Product Engineer", 100000, 1),
       ("Product Designer", 70000, 1),
       ("Lead Engineer", 180000, 2),
       ("Software Engineer", 150000, 2),
       ("Systems Engineer", 100000, 2),
       ("Financial Analyst", 170000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Accountant", 125000, 3),
       ("Lawyer", 150000, 4),
       ("Sales Head", 210000, 5),
       ("Sales Executive", 130000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "McKensy", 1, null),
       ("Micheal", "Dean", 2, 1),
       ("Bridget","Briggs", 3, 1),
       ("Amanda", "Wright", 4, null),
       ("Kevin", "Page", 5, 4),
       ("Tara", "Singh", 6, 4),
       ("Alex", "Pearson", 7, null),
       ("Sam", "George", 8, null),
       ("Tom", "Mason", 9, 7),
       ("Mira","Kapoor", 10, 8),
       ("Daniel","Jonas", 11, null),
       ("Luke","Jefferson", 12, 11);

