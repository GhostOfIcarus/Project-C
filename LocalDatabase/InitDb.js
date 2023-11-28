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

async function createDatabase() {
  try {
    // Create the database if it doesn't exist
    await db.none(`CREATE DATABASE IF NOT EXISTS ${connection.database}`);

    console.log(`Database '${connection.database}' created or already exists.`);
  } catch (error) {
    console.error('Error creating database:', error.message);
  }
}

async function createTable() {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL
      );
    `);

    console.log('Table "users" created or already exists.');
  } catch (error) {
    console.error('Error creating table "users":', error.message);
  }
}

async function insertTestData() {
  try {
    // Insert some sample data into your table
    const insertDataQuery = `
      INSERT INTO users (name, age)
      VALUES
        ('Drik-Jan', 99),
        ('Alessandro', 25);
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
    await createTable();

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
