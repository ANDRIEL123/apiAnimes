const express = require('express')
const app = express()

const rotaEpisodios = require('./routes/episodio')
const rotaAnimes = require('./routes/animes')

app.use('/episodio', rotaEpisodios);
app.use('/animes', rotaAnimes);

module.exports = app;