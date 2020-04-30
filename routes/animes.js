const express = require('express')
const router = express.Router();
const AnimesController = require('../controllers/animes-controller');

//RETORNA TODOS OS ANIMES
router.get('/', AnimesController.getAnimes)

//RETORNA OS DADOS DE UM ANIME ESPECÍFICO
router.get('/:id_animes', AnimesController.getAnimeEspecifico)

//INSERE UM ANIME ESPECÍFICO
router.post('/', AnimesController.postAnime)

//ALTERA UM ANIME ESPECÍFICO
router.patch('/:id_animes', AnimesController.patchAnimeEspecifico)

//DELETA UM ANIME ESPECÍFICO
router.delete('/:id_animes', AnimesController.deleteAnimeEspecifico)

module.exports = router