const express = require('express')
const app = express()

const rotaAnimes = require('./routes/episodio')

app.use('/episodio', rotaAnimes);

module.exports = app;