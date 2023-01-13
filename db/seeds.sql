INSERT INTO departments (id, title)
VALUES (0,"Sales"), 
       (0,"Engineering"),
       (0,"Finance"),
       (0,"Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (0,"Sales Lead", 100000, 1),
       (0,"Salesperson", 80000, 1),
       (0,"Lead Engineer", 150000, 2),
       (0,"Software Engineer", 120000, 2),
       (0,"Account Manager", 160000, 3),
       (0,"Accountant", 125000, 3),
       (0,"Legal Team Lead", 250000, 4),
       (0,"Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)  
VALUES (0,"John", "Doe", 1, null),
       (0,"Mike", "Chan", 2, 1),
       (0,"Ashley", "Rodriguez", 3, null),
       (0,"Kevin", "Tupik", 4, 3),
       (0,"Kunal", "Singh", 5, null),
       (0,"Malia", "Brown", 6, 6),
       (0,"Sarah", "Lourd", 7, null),
       (0,"Tom", "Allen", 8, 7);