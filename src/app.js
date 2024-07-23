const express = require("express");
const app = express();
const Pool = require('pg').Pool;
const port = 5000;
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_NUMBER
});

pool.connect((err, client, release) => {
    if (err) {
        return console.log(err);
    }
    client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
            return console.log(err);
        }
        console.log("===== Connect To PostGres Database =====")
    })
})


app.listen(port, () => {
    console.log(`========== Server Started At : ${port} ==========`);
})