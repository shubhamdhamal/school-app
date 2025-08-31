import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "http://sql12.freesqldatabase.com",
    user: "sql12796859",       // replace with your MySQL user
    password: "QHz3JdnNxW", // replace with your MySQL password
    database: "sql12796859"
  });
  return connection;
}
