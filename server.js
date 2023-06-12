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