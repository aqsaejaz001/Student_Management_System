#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 200;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid Successefully for ! ${this.name}`);
        console.log(`Remaining Balance is: $${this.balance}`);
    }
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfuly. Student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let std_Found = this.find_student(student_id);
        if (std_Found) {
            std_Found.enroll_course(course);
            console.log(`${student_id} enrolled in ${course} successfully !`);
        }
    }
    view_student_balance(student_id) {
        let std_Found = this.find_student(student_id);
        if (std_Found) {
            std_Found.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    pay_student_fees(student_id, amount) {
        let std_Found = this.find_student(student_id);
        if (std_Found) {
            std_Found.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    show_student_status(student_id) {
        let std_Found = this.find_student(student_id);
        if (std_Found) {
            std_Found.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find(stdt => stdt.id === student_id);
    }
}
async function main() {
    console.log("-".repeat(60));
    let student_managment = new Student_manager();
    while (true) {
        let choice_answer = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: ['Add Student', 'Enroll Student', 'View Student Balance', 'Pay Fees', 'Show Status', 'Exit']
            }
        ]);
        if (choice_answer.choice === 'Add Student') {
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter a Student Name"
                }
            ]);
            student_managment.add_student(name_input.name);
        }
        if (choice_answer.choice === "Enroll Student") {
            let course_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Studnt ID"
                },
                {
                    name: "course",
                    type: "input",
                    message: "Enter a Course Name"
                }
            ]);
            student_managment.enroll_student(course_input.student_id, course_input.course);
        }
        if (choice_answer.choice === "View Student Balance") {
            let balance_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID"
                }
            ]);
            student_managment.view_student_balance(balance_input.student_id);
        }
        if (choice_answer.choice === "Pay Fees") {
            let fees_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID"
                },
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amout to pay"
                }
            ]);
            student_managment.pay_student_fees(fees_input.student_id, fees_input.amount);
        }
        if (choice_answer.choice === "Show Status") {
            let Status_input = await inquirer.prompt({
                name: "student_id",
                type: "number",
                message: "Enter a Student ID"
            });
            student_managment.show_student_status(Status_input.student_id);
        }
        if (choice_answer.choice === "Exit") {
            console.log("Exiting....");
            process.exit();
        }
    }
}
main();
