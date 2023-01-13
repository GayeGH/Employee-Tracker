const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
require("console.table");

const port = 3000

//Connection information for sql database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Bunny54!!",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);
//Connect to mysql server and database
db.connect(function (err) {
  if (err) throw err;
  console.log("SQL Connected");

  viewMenu();
});
//db.query("SELECT * FROM employee", (err, results) => {
// console.log (results);

function viewMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
    ]
      }
    ])

    .then((response) => {
      const menuChoice = response.choice;

      if (response.choice === "View all departments") {
        // query db for all departmenets
        db.query("SELECT * FROM departments", function (err, results) {
          console.table(results);
        viewMenu()
        });
    }
       
       else if (response.choice === "View all roles") {
         // query db for all roles
         db.query("SELECT * FROM roles", function (err, results) {
             console.table(results);
          viewMenu()
          });
        } 
       else if (response.choice === "View all employees") {
         // query db for all employees
         db.query("SELECT * FROM employees", function (err, results) {
             console.table(results);
           viewMenu()
           });
        };
    

    

// {
//     type: "list",
//     name: "department name",
//     message: "What is the name of the department?",
//     choices: ["Engineering", "Finance", "Legal", "Sales"],
//   },
//   {
//     type: "list",
//     name: "role name",
//     message: "What is the name of the role?",
//     choices: [
//       "Lead Engineer",
//       "Software Engineer",
//       "Accountant",
//       "Account Manager",
//       "Legal Team Lead",
//       "Lawyer",
//       "Salesperson",
//     ],
//   },
//   {
//     type: "list",
//     name: "salary",
//     message: "What is the salary of the role?",
//     choices: [
//       "80000",
//       "120000",
//       "125000",
//       "150000",
//       "160000",
//       "190000",
//       "250000",
//     ],
//   },
//   {
//     type: "input",
//     name: "department role",
//     message: "Which department does the role belong to?",
//   },
//   {
//     type: "input",
//     name: "employee first name",
//     message: "What is employee first name?",
//   },
//   {
//     type: "input",
//     name: "employee last name",
//     message: "What is employee last name?",
//   },
//   {
//     type: "list",
//     name: "employee role",
//     message: "What is employee role?",
//     choices: [
//       "Salesperson",
//       "Lead Engineer",
//       "Software Engineer",
//       "Accountant",
//       "Account Manager",
//       "Legal Team Lead",
//       "Lawyer",
//     ],
//   },
//   {
//     type: "input",
//     name: "manager",
//     message: "Who is employee manager?",
//   },
//   {
//     type: "input",
//     name: "role update",
//     message: "Which employee role do you want to update?",
//   },
//   {
//     type: "input",
//     name: "choice",
//     message: "What would you like to do?",
//     choices: ["Add a department.", "Add a role.", "Add an employee."],


