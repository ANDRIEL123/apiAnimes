const mysql = require('../mysql')

exports.getEpisodios = async (req, res, next) => {
    try {
        const results = await mysql.execute(`SELECT e.idepisodios, 
                                                    e.titleEpisodio,
                                                    e.keyEpisodio,
                                                    a.idanimes, 
                                                    a.titleAnime,
                                                    e.imgEpisodio,
                                                    a.imgAnime
                                               FROM episodios e
                                         INNER JOIN animes a
                                                 ON e.animes_idanimes = a.idanimes;`)

        res.status(200).send({
            mensagem: 'Retorna todos os episodios',
            response: results

        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}

exports.getEpisodiosAnimeEspecifico = async (req, res, next) => {

    try {
        const results = await mysql.execute(`SELECT e.idepisodios, 
                                                    e.titleEpisodio,
                                                    e.keyEpisodio,
                                                    e.descriptionEpisodio,
                                                    a.idanimes, 
                                                    a.titleAnime,
                                                    e.imgEpisodio,
                                                    a.imgAnime
                                               FROM episodios e
                                         INNER JOIN animes a
                                                 ON e.animes_idanimes = a.idanimes
                                                AND a.idanimes = ?`,
            [req.params.id_animes])
        res.status(200).send({
            mensagem: 'Episodios do animes retornados',
            response: results
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.postEpisodio = async (req, res, next) => {
    let filterPath = null
    if (req.file) {
        let auxfilterPath = req.file.path.split('\\');
        filterPath = auxfilterPath[1]
    }


    try {
        const results = await mysql.execute(`INSERT INTO episodios
                                            (titleEpisodio, descriptionEpisodio, animes_idanimes, keyEpisodio, imgEpisodio)
                                            VALUES (?, ?, ?, ?, ?)`,
            [req.body.titleEpisodio,
            req.body.descriptionEpisodio,
            req.body.idanime,
            req.body.keyEpisodio,
                filterPath])

        res.status(200).send({
            mensagem: 'Episodio adicionado com sucesso!',
            episodio: {
                id: results.insertId,
                title: req.body.titleEpisodio,
                description: req.body.descriptionEpisodio,
                id_animeVinculado: req.body.idanime
            }

        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.getEpisodioEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute(`SELECT e.idepisodios,
                                                    e.titleEpisodio,
                                                    e.keyEpisodio,
                                                    a.idanimes,
                                                    a.titleAnime
                                               FROM episodios e
                                         INNER JOIN animes a
                                                 ON e.animes_idanimes = a.idanimes
                                              WHERE e.idepisodios = ${req.params.id_episodio}`)

        res.status(200).send({
            mensagem: 'Retornando um episodios específico',
            response: results[0]
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}


exports.patchEpisodioEspecifico = async (req, res, next) => {
    let filterPath = null
    if (req.file) {
        let auxfilterPath = req.file.path.split('\\');
        filterPath = auxfilterPath[1]
    }
    try {
        const results = await mysql.execute(`UPDATE EPISODIOS 
                                            SET titleEpisodio = ?, 
                                                descriptionEpisodio = ?, 
                                                keyEpisodio = ?, 
                                                imgEpisodio = ?
                                          WHERE idepisodios = ?`,
            [req.body.titleEpisodio, req.body.descriptionEpisodio, req.body.keyEpisodio, filterPath, req.body.idepisodio])

        res.status(200).send({
            mensagem: 'Episodio específico alterado.',
            response: results
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
}


exports.deleteEpisodioEspecifico = async (req, res, next) => {
    try {
        const results = await mysql.execute('DELETE FROM episodios WHERE idepisodios = ?',
            [req.params.id_episodio])
        if (results.affectedRows !== 0) {
            res.status(200).send({
                mensagem: 'Episodio excluído.',
                response: results
            })
        } else {
            res.status(200).send({
                mensagem: 'Episódio inexistente.',
                response: results
            })
        }
    } catch (error) {
        res.status(500).send({ error: error })
    }
}
