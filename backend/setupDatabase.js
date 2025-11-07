const pool = require('./database');

// Create users table
const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created/verified successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};

// Run setup
const setup = async () => {
  try {
    console.log('Setting up database...');
    await createUsersTable();
    console.log('✓ Database setup completed!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

setup();

