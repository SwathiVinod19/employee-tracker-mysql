const inquirer = require('inquirer');
const db = require('../config/connection');
const consoleTable = require('console.table');
const start = require('../server.js');
const logo = require('asciiart-logo');


let managersArray = [];
let departmentsArray = [];
let rolesArray = [];
let employeesArray = [];

//-----------------------------------------------------Add Department---------------------------------------------------------//
const addADept = [
    {
        type: 'input',
        name: 'department',
        message: 'Please enter the name of the dept you want to add :'
    }
];

function addDepartment(department) {
    // console.log("This is the result:" + department)
    db.query('INSERT INTO department (department_name) VALUES (?);', 
    department, function (err, results) {
        console.log(`Successfully added ${department} !`);
        start.startPrompt();
    })
}

function addDepartmentPrompt() {
    inquirer.prompt(addADept)
    .then((response) => {
        addDepartment(response.department);
    });
}

//----------------------------------------------------Add a new role-----------------------------------------------------------//
const addARole = [
    {
        type: 'input',
        name: 'role',
        message: 'Please enter the new role:'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter salary of the new role:',
        validate: (answer) => {
            if (isNaN(answer)) {
                return "Error! please enter numbers only:";
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Choose the department where the role belongs',
        choices: departmentsArray
    }
];
function addRole(role, salary, department) {
    db.query("INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?));", 
    [role, Number(salary), department], function (err, results) {
        console.log(results);
        console.log("Successfully added the role!");
        start.startPrompt();  
    })
}

function RolePrompt(){
    db.query('SELECT department_name FROM department', function (err, results) {   
        departmentsArray.length = 0;
        for (const department in results) {

            if (departmentsArray.indexOf(results[department].department_name) === -1) {

                departmentsArray.push(results[department].department_name);
            }
        }  
    })
    inquirer.prompt(addARole)

    .then((response) => {

        addRole(response.role, response.salary, response.department);

    });
}

//-----------------------------------------------------Add an employee---------------------------------------------------------//
const addAnEmployee = [
    {
        type: 'input',
        name: 'fName',
        message: "Please enter the first name:"
    },
    {
        type: 'input',
        name: 'lName',
        message: "Please enter the last name:"
    },
    {
        type: 'list',
        name: 'role',
        message: "Please select the role:",
        choices: rolesArray
    },
    {
        type: 'list',
        name: 'manager',
        message: "Please select the manager:",
        choices: managersArray
    }
];
function addEmployee(fName, lName, role, manager) {

    const managerName = manager.split(" ");

    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT r.id FROM roles r WHERE r.role_title = ?), (SELECT e.id FROM employee e WHERE e.first_name = ? AND e.last_name = ?));', [fName, lName, role, managerName[0], managerName[1]], function (err, results) {
        console.log(err);
        console.log(results);
        console.log("This employee has been successfully added to the database!");
        start.startPrompt();  
    })
}

function addEmployeePrompt(){
    db.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', function (err, results) {
        managersArray.length = 0;
        for (const person in results) {
            if (managersArray.indexOf(results[person].manager_name === -1)) {
                managersArray.push(results[person].manager_name);
            }
        }
        managersArray.push("None");
    });    
    db.query('SELECT role_title FROM roles', function (err, results) {
        rolesArray.length = 0;
        for (const role in results) {
            if (rolesArray.indexOf(results[role].role_title) === -1) {
                rolesArray.push(results[role].role_title);
            }
        }     
    });
    inquirer.prompt(addAnEmployee)
    .then((response) => {
        addEmployee(response.fName, response.lName, response.role, response.manager);
    });
}

//-------------------------------------------To view departments in the database-------------------------------------------------//

function viewDepartments(){
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        start.startPrompt();
    })
};

//------------------------------------------To view roles in the database-------------------------------------------------------//

function viewRoles(){
    db.query('SELECT roles.id AS role_id, roles.role_title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
        console.table(results)
        start.startPrompt();
    })
};

//-------------------------------------------To view employees in the database-------------------------------------------------//

function viewEmployees(){
    db.query('SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id;', 
    function (err, results) {
        console.table(results)
        start.startPrompt();
    })
};

//-----------------------------------------------To view employees by manager-------------------------------------------------//
const chooseAManager = [
    {
        type: 'list',
        name: 'manager',
        message: 'Please select the managers name :',
        choices: managersArray
    }
];

function Manager(firstName, lastName){
    db.query('SELECT b.first_name AS manager_firstname, b.last_name AS manager_lastname, a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name = ? AND b.last_name = ?;', 
    [firstName, lastName], function (err, results) { 
        console.table(results)
        start.startPrompt();
    })
};

function chooseManagerPrompt() {
    inquirer.prompt(chooseAManager)
    .then((response) => {
        let fullName = response.manager;
        const splitManagerName = fullName.split(" ");
        Manager(splitManagerName[0], splitManagerName[1]);
    });
}

function getManager() {
    db.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', 
    function (err, results) {
        managersArray.length = 0;
        for (const person in results) {
            if (managersArray.indexOf(results[person].manager_name) === -1) {
                managersArray.push(results[person].manager_name);
            } 
        }
        chooseManagerPrompt();        
    })
};

//----------------------------------------------------view employee by department-----------------------------------------------//
const chooseADept = [
    {
        type: 'list',
        name: 'department',
        message: 'Please select a department:',
        choices: departmentsArray
    }
];
function Department (department) {
    db.query('SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE d.department_name = ?;', 
    department, function (err, results) {
        console.table(results);
        start.startPrompt();
    })
};

function ChooseAdeptPrompt() {
    inquirer.prompt(chooseADept)
    .then((response) => {
        Department(response.department);
    });
}

function viewDepartment (){
    db.query('SELECT department_name FROM department', function (err, results) {
        departmentsArray.length = 0;
        for (const department in results) {
            if (departmentsArray.indexOf(results[department].department_name) === -1) {
                departmentsArray.push(results[department].department_name);
            }
        }
        ChooseAdeptPrompt();        
    })
}

//--------------------------------------------------update an employee role---------------------------------------------------//
const updateEmployeeDetails = [
    {
        type: 'list',
        name: 'employee',
        message: 'Select an employee to update:',
        choices: employeesArray
    },
    {
        type: 'list',
        name: 'role',
        message: "Please select employee's new role:",
        choices: rolesArray
    }
];
function updateEmpDetails(name, role){
    const employeeName = name.split(" ");
    db.query('UPDATE employee SET role_id = (SELECT r.id FROM roles r WHERE r.role_title = ?) WHERE employee.first_name = ? AND employee.last_name = ?;', 
    [role, employeeName[0], employeeName[1]], function (err, results) {

        if (err) {

            console.log(err);
        } else {
            console.table(results);
            console.log("Successfully updated the employee details!");
            start.startPrompt(); 
        }
})};

function updateEmployeeRolePrompt() {
    inquirer.prompt(updateEmployeeDetails)
    .then((response) => {
        updateEmpDetails(response.employee, response.role);
    });
}

function selectEmployeeToUpdate(){
    db.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', function (err, results) {
        employeesArray.length = 0;
        for (const person in results) {
            if (employeesArray.indexOf(results[person].employee_name) === -1) {
                employeesArray.push(results[person].employee_name);
            }
        }
    })
    db.query('SELECT role_title FROM roles', function (err, results) {
        rolesArray.length = 0;
        for (const role in results) {
            if (rolesArray.indexOf(results[role].role_title) === -1) {
                rolesArray.push(results[role].role_title);
            }  
        }
        updateEmployeeRolePrompt();   
    });
};

//---------------------------------------------------update employee manager--------------------------------------------------//
const updateManagerDetails = [
    {
        type: 'list',
        name: 'employee',
        message: 'Select an employee to update:',
        choices: employeesArray
    },
    {
        type: 'list',
        name: 'manager',
        message: "Please select employee's new manager:",
        choices: managersArray
    }
];
function updateManager(name, manager){
    const empName = name.split(" ");
    const manName = manager.split(" ");
    db.query('UPDATE employee SET manager_id = (SELECT a.id FROM (SELECT b.id FROM employee b WHERE b.first_name = ? AND b.last_name = ?) a) WHERE first_name = ? AND last_name = ?;', 
    [manName[0], manName[1], empName[0], empName[1]], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            console.log("Successfully updated the manager name !");
            start.startPrompt(); 
        }
})};

function updateManagerPrompt() {
    inquirer.prompt(updateManagerDetails)
    .then((response) => {
        updateManager(response.employee, response.manager);
    });
}

function selectManager(){
    db.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', 
    function (err, results) {
        //employeesArr = [];
        employeesArray.length = 0;
        for (const person in results) {
            if (employeesArray.indexOf(results[person].employee_name) === -1) {
                employeesArray.push(results[person].employee_name);
            }
        }
    })
    db.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', 
    function (err, results) {
        managersArray.length = 0;
        for (const person in results) {
            if (managersArray.indexOf(results[person].manager_name) === -1) {
                managersArray.push(results[person].manager_name);
            }
        }
        managersArray.push("None");
        updateManagerPrompt();  
    });
};

//--------------------------------------------------------delete department--------------------------------------------------//
const deleteDept = [
    {
        type: 'list',
        name: 'department',
        message: 'Select the department you want to delete:',
        choices: departmentsArray
    }
];
function deleteDepartment(department) {
    db.query('DELETE FROM department WHERE department_name = ?;', department, function (err, results) {
        console.table(results);
        start.startPrompt();
    })
}

function getDepartmentsToDelete (){
    db.query('SELECT department_name FROM department', function (err, results) {
        departmentsArray.length = 0;
        for (const department in results) {
            if (departmentsArray.indexOf(results[department].department_name) === -1) {
                departmentsArray.push(results[department].department_name);
            }
        }
        inquirer.prompt(deleteDept)
        .then((response) => {
            deleteDepartment(response.department);
        });        
    })
}


//-------------------------------------------------delete Roles--------------------------------------------------------------//

const deleteARole = [
    {
        type: 'list',
        name: 'role',
        message: 'Select a role to delete:',
        choices: rolesArray
    }
];
function deleteRoles(role) {
    db.query('DELETE FROM roles WHERE role_title = ?;', role, function (err, results) {
        console.table(results);
        start.startPrompt();
    })
}

function getRolesToDelete (){
    db.query('SELECT role_title FROM roles', function (err, results) {
        rolesArray.length = 0;
        for (const role in results) {
            if (rolesArray.indexOf(results[role].role_title === -1)) {
                rolesArray.push(results[role].role_title);
            }
        }
        inquirer.prompt(deleteARole)
        .then((response) => {
            deleteRoles(response.role);
        });        
    })
}

//-----------------------------------------------Delete employees--------------------------------------------------------------//
const deleteEmployeeDetails = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee to delete:',
        choices: employeesArray
    }
];
function deleteEmployee(name) {
    const employeeName = name.split(" ");
    db.query('DELETE FROM employee WHERE first_name = ? AND last_name = ?;', 
    [employeeName[0], employeeName[1]], function (err, results) {
        console.table(results);
        start.startPrompt();
    })
}

function getEmployeesToDelete (){
    db.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', 
    function (err, results) {
        employeesArray.length = 0;
        for (const person in results) {
            if (employeesArray.indexOf(results[person].employee_name) === -1) {
                employeesArray.push(results[person].employee_name);
            }
        }
        inquirer.prompt(deleteEmployeeDetails)
        .then((response) => {
            deleteEmployee(response.name);
        });        
    })
}
//------------------------------------------------------calculate Dept Budget-----------------------------------------------//

//attempting the bonus activity

const deptBudget = [
    {
      type: 'list',
      name: 'department',
      message: 'Select the department whose budget you want to calculate :',
      choices: departmentsArray
    }
  ];
  
  function viewDepartmentBudget(department) {
    db.query(
      'SELECT SUM(salary) AS department_budget FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id WHERE department.department_name = ?;',
      department,
      function (err, results) {
        console.log(`Total Utilized Budget of ${department}: ${results[0].department_budget}`);
        start.startPrompt();
      }
    );
  }
  
  function viewDepartmentBudgetPrompt() {
    db.query('SELECT department_name FROM department', function (err, results) {
      departmentsArray = results.map(result => result.department_name);
      inquirer.prompt(deptBudget).then((response) => {
        viewDepartmentBudget(response.department);
      });
    });
  }
  


//-------------------------------------------------------quit--------------------------------------------------------------//
function quit () {
    console.table(logo({
        name: "Bye!",
    }).render());
    process.exit();
}


module.exports = {  viewDepartments, viewRoles, viewEmployees, getManager, viewDepartment, addDepartmentPrompt, RolePrompt, addEmployeePrompt, selectEmployeeToUpdate, selectManager, getDepartmentsToDelete, getRolesToDelete, getEmployeesToDelete, viewDepartmentBudgetPrompt, quit };