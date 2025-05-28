const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.json());

app.use(express.static('public'));


app.use('/api', routes);

module.exports = app;
