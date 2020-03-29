const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool


//RETORNA TODOS OS EPISODIOS

router.get('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM episodios',
            (err, results, fields) => {
                if (err) throw err;

                res.status(201).send({
                    mensagem: 'Retorna todos os episodios',
                    response: results
                })
            }
        )
    })
})


//INSERE UM EPISODIO
router.post('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'INSERT INTO episodios (title, description, animes_idanimes) VALUES (?, ?, ?)',
            [req.body.title, req.body.description, req.body.idanime],
            (err, results, fields) => {
                connection.release();
                if (err) throw err;
                res.status(201).send({
                    mensagem: 'Episodio adicionado com sucesso!',
                    id_episodio: results.insertId
                })
            }
        )
    })

})

//RETORNA OS DADOS DE UM EPISODIOE ESPECÍFICO
router.get('/:id_episodio', (req, res, next) => {
    const id = req.params.id_episodio
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM episodios WHERE idepisodios = ?',
            [id],
            (err, results, fields) => {
                if (err) throw err;
                res.status(201).send({
                    mensagem: 'Retornando um episodios específico',
                    response: results
                })
            }
        )

    })
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