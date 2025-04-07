
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: 'admin',
  database: "VITALCURE",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

export const init = async () => {
  try {
    const schemaPath = path.join(path.resolve(), 'database', 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf-8');
    await pool.query(schema);
    console.log('✅ Database initialized!');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};

export default pool;
