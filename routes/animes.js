const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool

//RETORNA TODOS OS ANIMES

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os animes'
    })
})


//INSERE UM ANIME
router.post('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'INSERT INTO animes (title, description) VALUES (?, ?)',
            [req.body.title, req.body.description],
            (err, results, fields) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: 'Anime adicionado com sucesso',
                    id_anime: results.insertId
                })
            }
        )
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