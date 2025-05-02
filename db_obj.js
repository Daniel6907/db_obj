import prompt from 'prompt-async';
import pg from 'pg';

const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_0pgwJMCOrht1@ep-frosty-fire-a94nhe0n-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

class Student {
    constructor(first_name, last_name, phone_number, email, mark) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.mark = mark;
    }
}

async function getAllStudents() {
    const result = await client.query('SELECT * FROM students');
    const rows = result.rows;

    const students = [];

    for (let i = 0; i < rows.length; i++) {
        const s = new Student(
            rows[i].first_name,
            rows[i].last_name,
            rows[i].phone_number,
            rows[i].email,
            rows[i].mark
        );
        students.push(s);
    }

    return students;
}

async function main() {
    await client.connect();

    const students = await getAllStudents();

    console.log('Список студентів:');
    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        console.log("Ім'я: " + s.first_name);
        console.log("Прізвище: " + s.last_name);
        console.log("Телефон: " + s.phone_number);
        console.log("Email: " + s.email);
        console.log("Оцінка: " + s.mark);
        console.log('---------------------');
    }

    await client.end();
}

main();