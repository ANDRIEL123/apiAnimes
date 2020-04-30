const express = require('express')
const router = express.Router();
const usuariosController = require('../controllers/usuario-controller')

//RETORNA TODOS OS USUARIOS
router.get('/', usuariosController.getUsuarios)

//RETORNA UM USUARIO

router.get('/:id_usuario', usuariosController.getUsuarioEspecifico)

//INSERE UM USUARIO

router.post('/', usuariosController.postUsuario)

//ALTERA UM ESPISÓDIO ESPECÍFICO
router.patch('/:id_episodio', usuariosController.patchUsuarioEspecifico)

//DELETA UM USUARIO ESPECÍFICO
router.delete('/:id_usuario', usuariosController.deleteUsuario)

module.exports = router