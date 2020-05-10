const mysql = require('../mysql')
const express = require('express')
const router = express.Router()


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
                key: animes.keyAnime,
                imgAnime: animes.imgAnime,
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
        /* AQUI É DIVIDO O CAMINHO DE UPLOAD DA IMAGEM PARA ARMAZENAR NO BANCO, 
        EXEMPLO: uploads\\anime.png, aplicando o método abaixo retorna 2 string em
        um array ficando uploads na posição e anime.png na posição 1, logo só
        preciso pegar a posição 1 como abaixo no 4 parâmetro passado na query */
        filterPath = req.file.path.split('\\');
        const results = await mysql.execute(`INSERT INTO animes 
                                            (titleAnime, descriptionAnime, keyAnime, imgAnime) 
                                            VALUES (?, ?, ?, ?)`,
            [req.body.titleAnime, req.body.descriptionAnime, req.body.keyAnime, filterPath[1]]);

        res.status(200).send({
            mensagem: 'Anime adicionado com sucesso!',
            episodio: {
                id: results.insertId,
                title: req.body.title,
                description: req.body.description,
                path: req.file.path
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
                                                SET titleAnime = ?, descriptionAnime = ?, keyAnime = ? 
                                              WHERE idanimes = ?`,
            [req.body.titleAnime, req.body.descriptionAnime, req.body.keyAnime, req.params.id_animes]);

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
