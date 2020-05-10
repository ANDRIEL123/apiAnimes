const express = require('express')
const router = express.Router();
const episodioController = require('../controllers/episodio-controller')
const uploadImgMulter = require('./metodos/multerUploadImgs').upload


//RETORNA TODOS OS EPISODIOS
router.get('/', episodioController.getEpisodios)

//RETORNA TODOS OS EPISODIOS DE UM ANIME ESPECIFICO
router.get('/animes/:id_animes', episodioController.getEpisodiosAnimeEspecifico)

/* INSERE UM EPISODIO ESPECÍFICO
   OBS: DENTRO DA ROTA DA PARA PASSAR QUALQUER COISA, NO CASO DESTE POST FOI PASSADO
   O METODO UPLOAD DO MULTER PARA REALIZAR UPLOAD DE IMAGENS */
router.post('/', uploadImgMulter.single('imgEpisodio'), episodioController.postEpisodio)

//RETORNA OS DADOS DE UM EPISODIO ESPECÍFICO
router.get('/:id_episodio', episodioController.getEpisodioEspecifico)

//ALTERA UM EPISODIO ESPECÍFICO
router.patch('/', episodioController.patchEpisodioEspecifico)

//DELETA UM EPISODIO ESPECÍFICO
router.delete('/', episodioController.deleteEpisodioEspecifico)

module.exports = router