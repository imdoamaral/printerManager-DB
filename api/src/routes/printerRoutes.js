/**
 * Arquivo: src/routes/printerRoutes.js
 * Descrição: arquivo responsável pelas rotas api relacionadas à entidade Impressora
 */

const router = require('express-promise-router')();
const printerController = require('../controllers/printerController');

// Definindo as rotas CRUD - Impressora

// Rota responsável por CRIAR uma nova Impressora: (POST) localhost:3000/api/printers
router.post('/printers', printerController.createPrinter);

// Rota responsável por LISTAR todas as Impressoras: (GET) localhost:3000/api/printers
router.get('/printers', printerController.listAllPrinters);

// Rota responsável por ENCONTRAR uma Impressora pelo seu ID: (GET) localhost:3000/api/printers/:id
router.get('/printers/:id', printerController.findPrinterById);

// Rota responsável por ATUALIZAR uma Impressora pelo seu ID: (PUT) localhost:3000/api/printers/:id
router.put('/printers/:id', printerController.updatePrinterById);

// Rota responsável por DELETAR uma impressora pelo seu ID: (DELETE) localhost:3000/api/printers/:id
router.delete('/printers/:id', printerController.deletePrinterById);

module.exports = router;