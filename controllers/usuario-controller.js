const mysql = require('../mysql')

exports.getUsuarios = async (req, res, next) => {
    try {
        const results = await mysql.execute('SELECT * FROM usuarios')
        res.status(201).send({
            mensagem: 'Retorna todos os usuarios',
            response: results
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}


exports.getUsuarioEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute(`SELECT *
                                           FROM usuarios
                                          WHERE usuarios.idusuarios = ?`,
            [req.params.id_usuario])
        res.status(200).send({
            mensagem: 'Retornando um usuario específico',
            response: results[0]
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}

exports.postUsuario = async (req, res, next) => {
    try {
        const results = await mysql.execute(`INSERT INTO usuarios (nome, user, password)
                                             VALUES (?,?,?)`,
            [req.body.nome, req.body.user, req.body.password])
        res.status(201).send({
            message: 'Incluido com sucesso!',
            response: results
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.patchUsuarioEspecifico = async (req, res, next) => {
    try {
        const results = mysql.execute(`UPDATE usuarios
    SET nome = ?,
        user = ?,
        password = ?
  WHERE idusuarios = ?`,
            [req.body.nome, req.body.user, req.body.password, req.params.id_episodio])

        res.status(201).send({
            message: 'Episodio alterado com sucesso',
            response: results,
            request: {
                type: 'PATCH',
                idusuario: req.params.id_usuario
            }
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}

exports.deleteUsuario = async (req, res, next) => {
    try {
        const results = await mysql.execute(`DELETE FROM usuarios
                                              WHERE idusuarios = ?`,
            [req.params.id_usuario])
        res.status(200).send({
            message: 'Usuario deletado com sucesso',
            response: results,
            request: {
                type: 'DELETE',
                idusuario: req.params.id_usuario
            }
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}