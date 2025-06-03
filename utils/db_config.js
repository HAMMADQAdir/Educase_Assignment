import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
};

console.log("Database configuration:", dbConfig);
const pool = mysql.createPool(dbConfig);
(async () => {
  try {
    const connection = await pool.getConnection();
    connection.query("use school_management");
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
export default pool;
