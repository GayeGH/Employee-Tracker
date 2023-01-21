const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
require("console.table");

const port = 3000;

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


function viewMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
        ],
      },
    ])

    .then((response) => {
      const menuChoice = response.choice;

      if (menuChoice === "View All Departments") {
        // query db for all departmenets
        db.query("SELECT * FROM departments", function (err, results) {
          console.table(results);
          viewMenu();
        });
      } else if (menuChoice === "View All Roles") {
        // query db for all roles
        db.query("SELECT * FROM roles", function (err, results) {
          console.table(results);
          viewMenu();
        });
      } else if (menuChoice === "View All Employees") {
        // query db to view employees
        
        db.query(
          "SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id",
          function (err, results) {
            console.table(results);
            viewMenu();
          }
        );

      } else if (menuChoice === "Add Department") {
        inquirer
          .prompt({
            type: "input",
            name: "addDept",
            message: "What department would you like to add",
          })
          .then((answers) => {
            db.query(
              "INSERT INTO departments VALUES(?,?)",
              [0, answers.addDept],
              function (err, results) {
                console.table(results);
                viewMenu();
              }
            );
          });

      } else if (menuChoice === "Add Role") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "addRole",
              message: "What role would you like to add?",
            },
            {
              type: "input",
              name: "addSalary",
              message: "Enter Salary",
            },
            {
              type: "input",
              name: "addDepartment_id",
              message: "Enter Department ID",
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO roles (title, salary, department_id)VALUES(?,?,?)",
              [answers.addRole, answers.addSalary, answers.addDepartment_id],
              function (err, results) {
                console.table(results);
                viewMenu();
              }
            );
          });

      } else if (menuChoice === "Add Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "addFirst_name",
              message: "Enter First Name",
            },
            {
              type: "input",
              name: "addLast_name",
              message: "Enter Last Name",
            },
            {
              type: "input",
              name: "addRole_id",
              message: "Enter Role ID",
            },
            {
              type: "input",
              name: "addManager_id",
              message: "Enter Manager ID",
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO employees (first_name, last_name, role_id, manager_id)VALUES(?,?,?,?)",
              [
                answers.addFirst_name,
                answers.addLast_name,
                answers.addRole_id,
                answers.addManager_id,
              ],
              function (err, results) {
                console.table(results);
                viewMenu();
              }
            );
          });

      } else if (menuChoice === "Update Employee Role") {
        // query db to view employees
        db.query("SELECT * FROM employees", function (err, results) {
          console.table(results);
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Choose new employee to update.",
                choices: results.map((row) => {
                  return {
                    name: `${row.first_name} ${row.last_name}`,
                    value: row.id,
                  };
                }),
              },
            ])
            .then((answers) => {
              console.log(answers);
              const employeeId = answers.employee;
              db.query('SELECT * FROM roles', function (err, results){
                const roleRows = results;
                inquirer.prompt([{
                  type: "list",
                  name: "role",
                  message: "Choose new role for employee.",
                  choices: roleRows.map((row) => {
                    return {
                      name: row.title,
                      value: row.id,
                    };
                  }),
               
                }])
                .then((answers) => {
                 console.log(answers);
                 db.query('UPDATE employees SET ? WHERE id = ?',[{role_id:answers.role},employeeId],function (err, res){
                  console.log(res);
                  viewMenu();
                 })
                });
              })
            });
        });
      }
    });

}