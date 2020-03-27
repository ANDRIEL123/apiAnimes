const express = require('express')
const router = express.Router();

//RETORNA TODOS OS ANIMES

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os animes'
    })
})


//INSERE UM ANIME
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Insere um anime'
    })
})

//RETORNA OS DADOS DE UM ANIME
router.get('/:id_animes', (req, res, next) => {
    const id = req.params.id_episodio
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Retorna dados de um anime específico',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'Retorna dados de um anime específico qualquer'
        })
    }
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Altera os dados de um episódio'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deleta um episódio'
    })
})


module.exports = router