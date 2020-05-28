const mysql = require('../mysql')

exports.getAnimes = async (req, res, next) => {
    let page = 0
    if (Number(req.query.page) !== 1) {
        page = (Number(req.query.page) - 1) * 10
    }

    try {
        const results = await mysql.execute(`SELECT SQL_CALC_FOUND_ROWS * FROM ANIMES LIMIT ${page},10;`)
        const numRegisters = await mysql.execute('SELECT FOUND_ROWS()')
        return res.status(200).send({
            mensagem: 'Retorna todos os animes',
            response: results,
            numRegisters: numRegisters[0]
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
        let filterPath = null
        if (req.file) {
            let auxfilterPath = req.file.path.split('\\');
            filterPath = auxfilterPath[1]
        }
        const results = await mysql.execute(`INSERT INTO animes 
                                            (titleAnime, descriptionAnime, keyAnime, imgAnime, categoriaAnime) 
                                            VALUES (?, ?, ?, ?)`,
            [req.body.titleAnime, req.body.descriptionAnime, req.body.keyAnime, filterPath, req.body.categoriaAnime]);

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

exports.filterAnimesTitle = async (req, res, next) => {
    try {
        let titleAnime = req.query.titleAnime
        const results = await mysql.execute(`SELECT * FROM animes 
                                            WHERE titleAnime LIKE '%${titleAnime}%'`)

        res.status(200).send({
            response: results
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

exports.patchAnimeEspecifico = async (req, res, next) => {
    try {
        /* AQUI É DIVIDO O CAMINHO DE UPLOAD DA IMAGEM PARA ARMAZENAR NO BANCO, 
        EXEMPLO: uploads\\anime.png, aplicando o método abaixo retorna 2 string em
        um array ficando uploads na posição e anime.png na posição 1, logo só
        preciso pegar a posição 1 como abaixo no 4 parâmetro passado na query */
        let filterPath = null
        if (req.file) {
            let auxfilterPath = req.file.path.split('\\');
            filterPath = auxfilterPath[1]
        }
        const results = await mysql.execute(`UPDATE ANIMES 
                                                SET titleAnime = ?, descriptionAnime = ?, keyAnime = ?, imgAnime = ? 
                                              WHERE idanimes = ?`,
            [req.body.titleAnime, req.body.descriptionAnime, req.body.keyAnime, filterPath, req.params.id_animes]);

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
