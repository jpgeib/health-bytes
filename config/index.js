const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.NODE_ENV === "production" ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
    user: process.env.NODE_ENV === "production" ? process.env.PROD_DB_USER : process.env.DEV_DB_USER,
    password: process.env.NODE_ENV === "production" ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
    database: process.env.NODE_ENV === "production" ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME
});

console.log(
    db.config.host,
    db.config.user
);

module.exports = db;