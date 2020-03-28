const express = require('express')
const router = express.Router();

//RETORNA TODOS OS EPISODIOS

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando o GET na rotas de episodios'
    })
})


//INSERE UM EPISODIO
router.post('/', (req, res, next) => {
    const episodio = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    }

    res.status(201).send({
        mensagem: 'usando o POST na rotas de episodios',
        episodioCriado: episodio
    })
})

//RETORNA OS DADOS DE UM EPISODIO
router.get('/:id_episodio', (req, res, next) => {
    const id = req.params.id_episodio
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'usando o GET para pega um episodio específico',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'usando o GET para pegar qualquer episodio'
        })
    }
})

//ALTERA UM EPISODIO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o PATCH na rotas de episodios'
    })
})

//DELETA UM EPISODIO

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o DELETE na rotas de episodios'
    })
})


module.exports = router