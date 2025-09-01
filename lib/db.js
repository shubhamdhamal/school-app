import mysql from "mysql2/promise";

export async function connectDB() {
  // Check if environment variables are set
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error("Database environment variables are not configured. Please check your .env.local file.");
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  return connection;
}
