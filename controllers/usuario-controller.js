const mysql = require('../mysql').pool
const executeMysql = require('../mysql').execute

exports.getUsuarios = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM usuarios',
            (err, results, fields) => {
                connection.release()
                if (err) throw err;

                res.status(201).send({
                    mensagem: 'Retorna todos os usuarios',
                    response: results
                })
            }
        )
    })
}

exports.getUsuarioEspecifico = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            `SELECT *
               FROM usuarios
              WHERE usuarios.idusuarios = ?`,
            [req.params.id_usuario],
            (err, results, fields) => {
                connection.release()
                if (err) throw err;
                res.status(201).send({
                    mensagem: 'Retornando um usuario específico',
                    response: results[0]
                })
            }
        )

    })
}

exports.postUsuario = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `INSERT INTO usuarios (nome, user, password)
             VALUES (?,?,?)`,
            [req.body.nome, req.body.user, req.body.password],
            (err, results, fields) => {
                if (err) throw err;
                connection.release()
                res.status(201).send({
                    message: 'Incluido com sucesso!',
                    response: results
                })
            }
        )
    })
}

exports.patchUsuarioEspecifico = (req, res, next) => {
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
                connection.release()
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
}

exports.deleteUsuario = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `DELETE FROM usuarios
              WHERE idusuarios = ?`,
            [req.params.id_usuario],
            (err, results, fields) => {
                connection.release()
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
}