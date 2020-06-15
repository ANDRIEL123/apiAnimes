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
    let categoria = []
    const categoriasAux = req.body.categorias
    console.log(typeof (categoriasAux))
    if (typeof (categoriasAux) === 'string') {
        let categoriaAux = categoriasAux.split(",")
        categoria = categoriaAux
    } else {
        categoriasAux.map(value => {
            categoria.push(value)
        })
    }

    try {
        /* AQUI É DIVIDO O CAMINHO DE UPLOAD DA IMAGEM PARA ARMAZENAR NO BANCO, 
        EXEMPLO: uploads\\anime.png, aplicando o método abaixo retorna 2 string em
        um array ficando uploads na posição e anime.png na posição 1, logo só
        preciso pegar a posição 1 como abaixo no 4 parâmetro passado na query */
        let auxfilterPath = null
        if (req.file !== undefined) {
            auxfilterPath = req.file.path.split('\\');
            filterPath = auxfilterPath[1]
        }
        const results = await mysql.execute(`INSERT INTO animes 
                                            (titleAnime, descriptionAnime, keyAnime, imgAnime) 
                                            VALUES (?, ?, ?, ?)`,
            [req.body.titleAnime, req.body.descriptionAnime, req.body.keyAnime, filterPath]);

        //Pego o valor do último ID inserido que é o acima
        const lastID = await mysql.execute(`SELECT last_insert_id()`);
        let id = Object.values(lastID[0])[0]

        //Query para inserção das categorias, na tabela categorias_animes
        //Só insiro se tiver alguma categoria
        if (categoria.length !== 0) {
            let query = `INSERT INTO categorias_animes (idanime, idcategoria) VALUES `
            await mysql.execute(query + categoria.map(num => {
                return `(${id},${num})`
            }))
        }
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
        const results = {}
        if (req.file) {
            let auxfilterPath = req.file.path.split('\\');
            filterPath = auxfilterPath[1]

            await mysql.execute(`UPDATE ANIMES 
                                                SET titleAnime = ?, descriptionAnime = ?, imgAnime = ? 
                                              WHERE idanimes = ?`,
                [req.body.titleAnime, req.body.descriptionAnime, filterPath, req.params.id_animes]);
        } else {
            await mysql.execute(`UPDATE ANIMES 
                                                SET titleAnime = ?, descriptionAnime = ?
                                              WHERE idanimes = ?`,
                [req.body.titleAnime, req.body.descriptionAnime, req.params.id_animes]);
        }
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
