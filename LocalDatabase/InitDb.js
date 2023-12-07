const pgPromise = require('pg-promise');

// Replace these values with your PostgreSQL connection details
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'BuurtBoer',
  user: 'postgres',
  password: 'admin@ad.min',
};

const pgp = pgPromise();
const db = pgp(connection);

// async function createDatabase() {
//   try {
//     // Create the database if it doesn't exist
//     await db.none(`CREATE DATABASE IF NOT EXISTS ${connection.database}`);

//     console.log(`Database '${connection.database}' created or already exists.`);
//   } catch (error) {
//     console.error('Error creating database:', error.message);
//   }
// }

async function createTables() {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS Employee (
        ID SERIAL PRIMARY KEY,
        First_Name VARCHAR(255) NOT NULL,
        Last_Name VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(64) NOT NULL,
        KeepSchedule BOOLEAN NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Company (
        ID SERIAL PRIMARY KEY,
        Admin_First_Name VARCHAR(255) NOT NULL,
        Admin_Last_Name VARCHAR(255) NOT NULL,
        Company_Name VARCHAR(255) NOT NULL,
        Full_Schedule BOOLEAN NOT NULL,
        Email VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(64) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Schedule (
        ID SERIAL PRIMARY KEY,
        Week_Number INTEGER NOT NULL,
        Monday BOOL NOT NULL,
        Tuesday BOOL NOT NULL,
        Wednesday BOOL NOT NULL,
        Thursday BOOL NOT NULL,
        Friday BOOL NOT NULL,
        Saturday BOOL NOT NULL,
        Sunday BOOL NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ScheduleFromEmployee (
        ID SERIAL PRIMARY KEY,
        Schedule_ID INTEGER NOT NULL,
        Employee_ID INTEGER NOT NULL,
        FOREIGN KEY (Schedule_ID) REFERENCES Schedule(ID),
        FOREIGN KEY (Employee_ID) REFERENCES Employee(ID)
      );

      CREATE TABLE IF NOT EXISTS EmployeesInCompany (
        ID SERIAL PRIMARY KEY,
        Employee_ID INTEGER NOT NULL,
        Company_ID INTEGER NOT NULL,
        FOREIGN KEY (Employee_ID) REFERENCES Employee(ID),
        FOREIGN KEY (Company_ID) REFERENCES Company(ID)
      );

      CREATE TABLE IF NOT EXISTS SuperAdmin (
        ID SERIAL PRIMARY KEY,
        First_Name VARCHAR(255) NOT NULL,
        Last_Name VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(64) NOT NULL
      );
    `);

    console.log('Tables created or already exist.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
}

async function insertTestData() {
  try {
    // Write your insert queries here
    const insertDataQuery = `
      INSERT INTO Employee (First_Name, Last_Name, Email, Password, KeepSchedule)
      VALUES ('John', 'Doe', 'john.dik@example.com', 'hashed-password', true),
      ('OEMPA', 'LOEMPA', 'oempa@loempa.com', 'oempa', true);

      INSERT INTO Company (Admin_First_Name, Admin_Last_Name, Company_Name, Full_Schedule, Email, Password)
      VALUES ('Jane', 'Doe', 'Example Company', true, 'company@email.com', 'hashed');

      INSERT INTO Schedule (Week_Number, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
      VALUES (1, false, true, true, true, true, true, true),
         (49, true, false, true, true, true, true, true),
         (50, true, true, false, true, true, true, true),
         (51, true, true, true, false, true, true, true),
         (52, false, true, true, true, false, true, true);

      INSERT INTO ScheduleFromEmployee (Schedule_ID, Employee_ID)
      VALUES (1, 1),
            (2, 1),
            (3, 1),
            (4, 1),
            (5, 1);

      INSERT INTO EmployeesInCompany (Employee_ID, Company_ID)
      VALUES (1, 1),
            (2, 1);

      INSERT INTO SuperAdmin (First_Name, Last_Name, Email, Password)
      VALUES ('Super', 'Admin', 'Admin@bleh.com', 'hashed');

    `;

    await db.none(insertDataQuery);

    console.log('Test data inserted successfully.');
  } catch (error) {
    console.error('Error inserting test data:', error.message);
  } finally {
    pgp.end(); // Close the connection pool
  }
}

// Wrap the entire code in an async function for better error handling
async function run() {
  try {
    // First, create the database
    //await createDatabase();

    // After the database is created (or if it already exists),
    // create the table
    await createTables();

    // After the table is created (or if it already exists),
    // insert the test data
    await insertTestData();
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection pool even if an error occurs
    pgp.end();
  }
}

// Call the run function to execute the script
run();
