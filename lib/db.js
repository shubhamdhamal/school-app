import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",       // replace with your MySQL user
    password: "root", // replace with your MySQL password
    database: "schoolDB"
  });
  return connection;
}
