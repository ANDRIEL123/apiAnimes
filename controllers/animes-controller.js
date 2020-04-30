const mysql = require('../mysql').pool


exports.getAnimes = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM animes',
            (err, results, fields) => {
                connection.release();
                if (err) throw err;
                let page;

                const response = results.map((animes, index) => {
                    if ((index / 3) < 1) {
                        page = 1
                    } else {
                        page = parseInt((index / 3) + 1)
                    }

                    return {
                        id_anime: animes.idanimes,
                        title: animes.titleAnime,
                        description: animes.descriptionAnime,
                        page: page,
                        request: {
                            type: 'GET',
                            url: 'localhost:3000/animes/' + animes.idanimes
                        }
                    }
                })

                res.status(200).send({
                    mensagem: 'Retorna todos os animes',
                    response: response
                })
            }
        )
    })
}

exports.postAnime = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'INSERT INTO animes (titleAnime, descriptionAnime) VALUES (?, ?)',
            [req.body.title, req.body.description],
            (err, results, fields) => {
                connection.release();
                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: 'Anime adicionado com sucesso!',
                    episodio: {
                        id: results.insertId,
                        title: req.body.titleAnime,
                        description: req.body.descriptionAnime
                    }

                })
            }
        )
    })
}

exports.getAnimeEspecifico = (req, res, next) => {
    const id = req.params.id_animes
    mysql.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            'SELECT * FROM animes WHERE idanimes = ?',
            [id],
            (err, results, fields) => {
                connection.release()
                if (err) throw err;
                res.status(202).send({
                    mensagem: 'Retornando um anime específico',
                    response: results[0]
                })
            }
        )

    })
}

exports.patchAnimeEspecifico = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `UPDATE ANIMES 
            SET titleAnime = ?, descriptionAnime = ? 
            WHERE idanimes = ?`,
            [req.body.title, req.body.description, req.params.id_animes],
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
}

exports.deleteAnimeEspecifico = (req, res, next) => {
    mysql.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `DELETE FROM animes WHERE idanimes = ?`,
            [req.params.id_animes],
            (err, results, fields) => {
                connection.release()
                if (err) throw err;
                res.status(202).send({
                    mensagem: 'Anime excluído.',
                    response: results
                })
            }
        )
    })
}