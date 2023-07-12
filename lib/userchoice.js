const { viewDepartments, viewRoles, viewEmployees, getManager, viewDepartment, addDepartmentPrompt, RolePrompt, addEmployeePrompt, selectEmployeeToUpdate, selectManager, getDepartmentsToDelete, getRolesToDelete, getEmployeesToDelete, viewDepartmentBudgetPrompt, quit } = require("./index.js");

function userChoice(response) {
    switch(response) {
        case 'View All Departments':
            viewDepartments();
        break;
        case 'View All Roles':
            viewRoles();
        break;
        case 'View All Employees':
            viewEmployees();
        break;
        case 'View Employees By Manager':
            getManager();
        break;
        case 'View Employees By Department':
            viewDepartment();
        break;
        case 'Add Department':
            addDepartmentPrompt();
        break;
        case 'Add Role':
            RolePrompt();
        break;
        case 'Add Employee':
            addEmployeePrompt();
        break;
        case 'Update Employee Role':
            selectEmployeeToUpdate();
        break;
        case 'Update Employee Manager':
            selectManager();
        break;
        case 'Delete Department':
            getDepartmentsToDelete();
        break;
        case 'Delete Role':
            getRolesToDelete();
        break;
        case 'Delete Employee':
            getEmployeesToDelete();
        break;
        case 'Department Budget':
            viewDepartmentBudgetPrompt();
        break;
        case 'Quit':
            quit();
        break;
    };
}


module.exports = userChoice;