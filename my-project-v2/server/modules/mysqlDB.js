import mysql from "mysql2";
const mysqlConnConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "!Biz8080",
  database: "testdb",
};

const dbConnection = mysql.createConnection(mysqlConnConfig);

export default dbConnection;
