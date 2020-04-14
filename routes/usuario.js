const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool

//RETORNA TODOS OS USUARIOS
router.get('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM usuarios',
            (err, results, fields) => {
                if (err) throw err;

                res.status(201).send({
                    mensagem: 'Retorna todos os usuarios',
                    response: results
                })
            }
        )
    })
})

//RETORNA UM USUARIO

router.get('/:id_usuario', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            `SELECT *
               FROM usuarios
              WHERE usuarios.idusuarios = ?`,
            [req.params.id_usuario],
            (err, results, fields) => {
                if (err) throw err;
                res.status(201).send({
                    mensagem: 'Retornando um usuario específico',
                    response: results[0]
                })
            }
        )

    })
})

//INSERE UM USUARIO

router.post('/', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `INSERT INTO usuarios (nome, user, password)
             VALUES (?,?,?)`,
            [req.body.nome, req.body.user, req.body.password],
            (err, results, fields) => {
                if (err) throw err;

                res.status(201).send({
                    message: 'Incluido com sucesso!',
                    response: results
                })
            }
        )
    })
})

//ALTERA UM ESPISÓDIO ESPECÍFICO
router.patch('/:id_episodio', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `UPDATE usuarios
                SET nome = ?,
                    user = ?,
                    password = ?
              WHERE idusuarios = ?`,
            [req.body.nome, req.body.user, req.body.password, req.params.id_episodio],
            (err, results, fields) => {
                if (err) throw err;

                res.status(201).send({
                    message: 'Episodio alterado com sucesso',
                    response: results,
                    request: {
                        type: 'PATCH',
                        idusuario: req.params.id_usuario
                    }
                })
            }
        )
    })
})

//DELETA UM USUARIO ESPECÍFICO
router.delete('/:id_usuario', (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `DELETE FROM usuarios
              WHERE idusuarios = ?`,
            [req.params.id_usuario],
            (err, results, fields) => {
                if (err) {
                    console.log('Erro ao deletar!');
                    throw err;
                }
                res.status(201).send({
                    message: 'Usuario deletado com sucesso',
                    response: results,
                    request: {
                        type: 'DELETE',
                        idusuario: req.params.id_usuario
                    }
                })
            }
        )

    })
})

module.exports = router