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


//INSERE UM EPISODIO ESPECÍFICO
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

//ALTERA UM EPISODIO ESPECÍFICO
router.patch('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `UPDATE EPISODIOS SET title = ?, description = ? WHERE idepisodios = ?`,
            [req.body.title, req.body.description, req.body.id_episodios],
            (err, results, field) => {
                connection.release();
                if (err) throw err;

                res.status(202).send({
                    mensagem: 'Episodio específico alterado.',
                    response: results
                })
            }
        )
    })
})

//DELETA UM EPISODIO ESPECÍFICO

router.delete('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'DELETE FROM episodios WHERE idepisodios = ?',
            [req.body.id_episodios],
            (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows !== 0) {
                    res.status(202).send({
                        mensagem: 'Episodio excluído.',
                        response: results
                    })
                } else {
                    res.status(202).send({
                        mensagem: 'Episódio inexistente.',
                        response: results
                    })
                }

            }
        )
    })
})

module.exports = router