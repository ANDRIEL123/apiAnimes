const mysql = require('../mysql')
const multer = require('multer')
const date = new Date();


//METODO PARA FORMATAR A DATA ATUAL
const dataFormatada = () => {
    let day = date.getDay()
    let month = date.getMonth()
    let year = date.getFullYear()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    return `${day}-${month}-${year}`
}

//METODO PARA FORMATAR A HORA ATUAL
const horaFormatada = () => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if (hours < 10) {
        hours = '0' + hours
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return `${hours}-${minutes}-${seconds}`
}

//MANIUPULAÇÃO DO LOCAL DO ARQUIVO E NOME QUE O MESMO TERÁ
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, dataFormatada() + '-' + horaFormatada() + '-' + file.originalname)
    }
})

//FILTRO DOS TIPOS ACEITOS DE EXTENSÕES DE ARQUIVO
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

//UPLOAD DO ARQUIVO
const upload = multer({
    storage: storage, //LOCAL PARA SALVAR E NOME
    fileFilter: fileFilter //FILTRO DE TIPO
})

exports.getEpisodios = async (req, res, next) => {
    try {
        const results = await mysql.execute(`SELECT e.idepisodios, 
                                                 e.titleEpisodio,
                                                 e.key,
                                                 a.idanimes, 
                                                 a.titleAnime
                                            FROM episodios e
                                      INNER JOIN animes a
                                              ON e.animes_idanimes = a.idanimes;`)


        const episodios = results.map(episodios => {
            return {
                idEpisodio: episodios.idepisodios,
                titleEpisodios: episodios.titleEpisodios,
                idanimes: episodios.idanimes,
                titleAnimes: episodios.titleAnimes,
                key: episodios.key,
                request: {
                    type: "GET",
                    urlEpisodios: `localhost:3000/episodios/${episodios.idepisodios}`
                }
            }
        })
        res.status(200).send({
            mensagem: 'Retorna todos os episodios',
            response: episodios

        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

}

exports.postEpisodio = upload.single('imgEpisodio'), async (req, res, next) => {
    try {
        const results = await mysql.execute(`INSERT INTO episodios 
                                            (titleEpisodio, descriptionEpisodio, animes_idanimes, key, imgEpisodio) 
                                            VALUES (?, ?, ?, ?, ?)`,
            [req.body.titleEpisodio,
            req.body.descriptionEpisodio,
            req.body.idanime,
            req.body.key,
            req.file.path])

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
                                                    e.key,
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
    try {
        const results = await mysql.execute(`UPDATE EPISODIOS SET title = ?, description = ? WHERE idepisodios = ?`,
            [req.body.title, req.body.description, req.body.id_episodios])

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
            [req.body.id_episodios])
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
