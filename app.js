const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const cors = require('cors')
const rotaEpisodios = require('./routes/episodio');
const rotaAnimes = require('./routes/animes');
const rotaUsuarios = require('./routes/usuario');

app.use(morgan('dev')) //GERA O LOG DO REQUEST HTTP

//Configuração para requisição JSON pelo body
app.use(bodyParse.urlencoded({ extended: false })) //Apenas dados simples
app.use(bodyParse.json()) //JSON de entrada no body


//Configuração dos CORS libera todos
app.use(cors(/*origin = "http://localhost:3001/" */))


app.use('/episodios', rotaEpisodios);
app.use('/animes', rotaAnimes);
app.use('/usuarios', rotaUsuarios);


// QUANDO NÃO ENCONTRA ROTA, ENTRA AQUI:

app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;