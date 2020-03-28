const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParse = require('body-parser')

const rotaEpisodios = require('./routes/episodio')
const rotaAnimes = require('./routes/animes')

app.use(morgan('dev'))

//Configuração para requisição JSON pelo body
app.use(bodyParse.urlencoded({ extended: false })) //Apenas dados simples
app.use(bodyParse.json()) //JSON de entrada no body

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }

    next();
})


app.use('/episodio', rotaEpisodios);
app.use('/animes', rotaAnimes);


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