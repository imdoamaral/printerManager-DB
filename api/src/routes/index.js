/**
 * Arquivo: src/routes/index.js
 * Descrição: arquivo responsável pela chamada da API da aplicação.
 */
 const express = require('express');

 const router = express.Router();

 router.get('/api', (req, res) => {
   res.status(200).send({
     success: 'true',
     message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL!',
   });
 });

 module.exports = router;