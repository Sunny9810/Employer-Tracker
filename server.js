const inquirer = require('inquirer');
const msql = require ('mysql2');

//Creating MYSQL connection

const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:'root',
    password:'Saraarev777',
    database:'empoyeeTracker_db',
});

//Connection to database
connection.connect((err)=>{
    if(err) throw err;
    console.log('Connected to the database.');
    start()
});

//Function to start the application
function start(){
    inquirer
    .createPromptModule({
        type:'list',
        name:'action',
        message:"what would you like to do",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add and employee',
            'Update an employee role',
            'Exit',
        ],
    })
    .then ((answer)=>{
        switch(answer.action){
            case 'View all departmenst':
                viewAllDepartments();
                break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                    case 'View all employess':
                        viewAllEmployees();
                        break;
                        case "Add a department":
                            addDepartment();
                            break;
                            case "Add an employee":
                    addEmployee();
                    break;
                    case "Update an employee role":
                    updateEmployeeRole();
                    break;
                    case "Exit":
                    connection.end();
                    console.log("Goodbye!");
                    break;

        }
    });
}

// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// function to view all roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}


// function to view all employees
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}