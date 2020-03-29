const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool

//RETORNA TODOS OS ANIMES
router.get('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM animes',
            (err, results, fields) => {
                if (err) throw err;

                res.status(201).send({
                    mensagem: 'Retorna todos os animes',
                    response: results
                })
            }
        )
    })
})


//INSERE UM ANIME ESPECÍFICO
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

//RETORNA OS DADOS DE UM ANIME ESPECÍFICO
router.get('/:id_animes', (req, res, next) => {
    const id = req.params.id_animes
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM episodios WHERE idanimes = ?',
            [id],
            (err, results, fields) => {
                if (err) throw err;
                res.status(201).send({
                    mensagem: 'Retornando um anime específico',
                    response: results
                })
            }
        )

    })
})

//ALTERA UM ANIME ESPECÍFICO
router.patch('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `UPDATE ANIMES SET title = ?, description = ? WHERE idanimes = ?`,
            [req.body.title, req.body.description, req.body.id_animes],
            (err, results, field) => {
                connection.release();
                if (err) throw err;

                res.status(202).send({
                    mensagem: 'Anime específico alterado.',
                    response: results
                })
            }
        )
    })
})

//DELETA UM ANIME ESPECÍFICO
router.delete('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            'DELETE FROM animes WHERE idanimes = ?',
            [req.body.id_animes],
            (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows !== 0) {
                    res.status(202).send({
                        mensagem: 'Anime excluído.',
                        response: results
                    })
                } else {
                    res.status(202).send({
                        mensagem: 'Anime inexistente.',
                        response: results
                    })
                }
            }
        )
    })
})


module.exports = router