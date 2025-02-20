require('dotenv').config()
const express = require('express');
const cors = require('cors');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const port = process.env.PORT;
const serverName = process.env.SERVER_NAME;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;

const app = express();
app.use(cors());

const config = {
    server: serverName,
    authentication: {
        type: 'default',
        options: {
            userName: user,
            password: password
        }
    },
    options: {
        database: dbName,
        encrypt: false,
        trustServerCertificate: true
    }
};

const connection = new Connection(config)

connection.on('connect', (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('connected to database')
    }
})

app.get('/', (req, res) => {
    res.send('This is Study Along backend');
});

connection.connect()

app.listen(port, () => {
    console.log(`Server is currently running on port ${port}`);
});
