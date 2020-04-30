const mysql = require('../mysql')


exports.getAnimes = async (req, res, next) => {
    try {
        const results = await mysql.execute("SELECT * FROM ANIMES")

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

        return res.status(200).send({
            mensagem: 'Retorna todos os animes',
            response: response
        })

    } catch (error) {
        return res.status(500).send({ error: error })
    }

}

exports.postAnime = async (req, res, next) => {
    try {
        const results = await mysql.execute('INSERT INTO animes (titleAnime, descriptionAnime) VALUES (?, ?)',
            [req.body.title, req.body.description]);
        res.status(200).send({
            mensagem: 'Anime adicionado com sucesso!',
            episodio: {
                id: results.insertId,
                title: req.body.title,
                description: req.body.description
            }
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.getAnimeEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute('SELECT * FROM animes WHERE idanimes = ?',
            req.params.id_animes)

        res.status(200).send({
            mensagem: 'Retornando um anime específico',
            response: results[0]
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

exports.patchAnimeEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute(`UPDATE ANIMES 
                                                SET titleAnime = ?, descriptionAnime = ? 
                                              WHERE idanimes = ?`,
            [req.body.title, req.body.description, req.params.id_animes]);

        res.status(200).send({
            mensagem: 'Anime específico alterado.',
            response: results
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

exports.deleteAnimeEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute(`DELETE FROM animes WHERE idanimes = ?`,
            [req.params.id_animes])

        res.status(200).send({
            mensagem: 'Anime excluído.',
            response: results
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}
