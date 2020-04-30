const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool
const episodioController = require('../controllers/episodio-controller')



//RETORNA TODOS OS EPISODIOS
router.get('/', episodioController.getEpisodios)


//INSERE UM EPISODIO ESPECÍFICO

router.post('/', episodioController.postEpisodio)

//RETORNA OS DADOS DE UM EPISODIO ESPECÍFICO
router.get('/:id_episodio', episodioController.getEpisodioEspecifico)

//ALTERA UM EPISODIO ESPECÍFICO
router.patch('/', episodioController.patchEpisodioEspecifico)

//DELETA UM EPISODIO ESPECÍFICO
router.delete('/', episodioController.deleteEpisodioEspecifico)

module.exports = router