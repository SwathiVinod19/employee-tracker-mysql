// Packages needed for this application
const userChoice = require('./lib/userchoice.js');

const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const title = "Employee Tracker";

// An array of questions for user input
const startQuestion = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Department", 
            "Delete Role",
            "Delete Employee",
            "Department Budget",
            "Quit"
        ]
    }
];

function startPrompt() {
    inquirer.prompt(startQuestion)
    .then((response) => {
        userChoice(response.options);
    });
}

// A function to initialize app
function init() {
    console.log(logo({
        name: "Employee Tracker",
    }).render());
    startPrompt();
}

// Function call to initialize app
init();


exports.startPrompt = startPrompt;