const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando o GET na rotas de episodios'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o POST na rotas de episodios'
    })
})


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

module.exports = router