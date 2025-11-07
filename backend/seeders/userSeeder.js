const bcrypt = require('bcrypt');
const pool = require('../database');

// Seed users
const seedUsers = async () => {
  try {
    console.log('Seeding users...');

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert test user
    await pool.query(
      `INSERT INTO users (email, password, name) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (email) DO NOTHING`,
      ['test@example.com', hashedPassword, 'Test User']
    );

    console.log('✓ Test user created:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123');
    console.log('✓ User seeding completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

