[![Node.js](https://img.shields.io/badge/Node.js-18.16.1-brightgreen.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://www.ecma-international.org/ecma-262/)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
[![GitHub](https://img.shields.io/badge/GitHub-SwathiVinod19-black.svg?logo=github)](https://github.com/Swathivinod19)


# sql-employee-tracker
A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Description
Manages employee data using content management system built with Node.js, Inquirer, and MySQL. The user can : 

1. View :  Departments, Roles, Employees, Employees by Manager and Department
2. Add : Department, Role, Employee
3. Update : Employee Role, Employee Manager
4. Delete : Department , Role and Employee

## Table of contents

[Installation](#Installation)

[Usage](#Usage)

[User Story](#User-story)

[Acceptance Criteria](#Acceptance-criteria)

[Screenshots](#Screenshots)

[Walkthrough Video](#Walkthrough-video)

[Links](#Links)

[References](#References)

[Acknowledgements](#Acknowledgements)

## Installation

 * Clone the repository,
   
 * It's important to Have MYSQL intalled in your computer. To install type " npm install --save mysql2 " in the terminal

 * Install the rest of the dependencies by typing " npm i " in the terminal
 
 * At the root of the repository (next to the package.json and server.js) create a .env file
 
 * Add the following code as follows

```
            DB_USER = <YOUR USERNAME without the Brackets>
            DB_PASSWORD = <YOUR PASSWORD Without the Brackets>

```

## Usage

1. Open the integrated terminal for db, type " mysql -u <USERNAME> -p ", Type in your password

2. Type "source schema.sql", followed by  "source seeds.sql" in the terminal

3. Open integrated terminal for "server.js" and type "node server.js"

4. Choose from the options and prompts

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```


## Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
<br>  

## Screenshots
![employee-tracker-one](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/a5ba4bc5-28e8-4ef9-83ad-e2a25ac18003)

node server.js

![employee-tracker-view](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/904bcb80-a449-4232-bfa7-509c2c51ce59)
View deptartment, roles

![employee-tracker-update-employee-role](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/519e3220-d9f0-4f03-a465-6c5971eccf04)
Update an employee role

![employee-tracker-add-employee](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/1b9243a0-9ae8-466e-a69f-4648c96e563c)
Add an employee

![employee-tracker-add -a-dept](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/6f8e6d17-b5ef-4b01-866c-bc2083785dc5)
Add a Department

![employee-tracker-view-by](https://github.com/SwathiVinod19/sql-employee-tracker/assets/129353324/d051ccfb-797b-4ea1-985a-366bc68cd863)
View by Manager


## Walkthrough Video

https://drive.google.com/file/d/1bg5cJnGzn2gbXB1QZGyVg5jjp8JYTDfn/view

## Links

https://github.com/SwathiVinod19/sql-employee-tracker

https://drive.google.com/file/d/1bg5cJnGzn2gbXB1QZGyVg5jjp8JYTDfn/view

## References
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

https://www.w3schools.com/js/js_loop_forin.asp

https://www.sqlshack.com/learn-sql-inner-join-vs-left-join/

https://www.youtube.com/watch?v=prl73KRkB34

https://www.youtube.com/watch?v=yauK_9vSlg8

https://www.youtube.com/watch?v=uDYsKFHowu0

https://www.youtube.com/watch?v=f7Ug8e9mvig

https://www.youtube.com/watch?v=7S_tz1z_5bA

https://www.youtube.com/watch?v=0OQJDd3QqQM

https://www.npmjs.com/package/mysql

https://www.npmjs.com/package/dotenv

https://www.npmjs.com/package/asciiart-logo

class videos 

Tutoring session

Peer learning

## Acknowledgements

I would like to thank my tutor, Instructor, TA and peers for their support and guidance
