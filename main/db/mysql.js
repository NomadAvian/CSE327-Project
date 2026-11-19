/**
 * MySQL connection pool for remote blog/user data.
 *
 * Install: npm install mysql2
 */

// import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    // pool = mysql.createPool({
    //   host: process.env.DB_HOST ?? 'localhost',
    //   port: Number(process.env.DB_PORT ?? 3306),
    //   user: process.env.DB_USER ?? 'andesite',
    //   password: process.env.DB_PASSWORD ?? '',
    //   database: process.env.DB_NAME ?? 'andesite',
    //   waitForConnections: true,
    //   connectionLimit: 10,
    // });
    pool = { _stub: true };
  }
  return pool;
}
