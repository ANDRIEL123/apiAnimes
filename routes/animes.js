const express = require('express')
const router = express.Router();
const AnimesController = require('../controllers/animes-controller');
const uploadImgMulter = require('./metodos/multerUploadImgs')

//RETORNA TODOS OS ANIMES
router.get('/', AnimesController.getAnimes)

router.get('/filter', AnimesController.filterAnimestitle)

//RETORNA OS DADOS DE UM ANIME ESPECÍFICO
router.get('/:id_animes', AnimesController.getAnimeEspecifico)

//INSERE UM ANIME ESPECÍFICO
router.post('/', uploadImgMulter.upload.single('imgAnime'), AnimesController.postAnime)

//ALTERA UM ANIME ESPECÍFICO
router.patch('/:id_animes', uploadImgMulter.upload.single('imgAnime'), AnimesController.patchAnimeEspecifico)

//DELETA UM ANIME ESPECÍFICO
router.delete('/:id_animes', AnimesController.deleteAnimeEspecifico)

module.exports = router