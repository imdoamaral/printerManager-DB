const { restart } = require('nodemon');
const { parse } = require('pg-protocol');
const db = require('../config/database');

// Método responsável por CRIAR um novo Toner
exports.createToner = async (req, res) => {
    const {
        model,
        quant
    } = req.body;

    const { rows } = await db.query(
        `INSERT INTO toners (
            model,
            quant
        ) VALUES ($1, $2)`,
        [
            model,
            quant
        ]
    );

    res.status(201).send({
        message: 'Toner added successfully!',
        body: {
            toner: {
                model,
                quant,
            }
        }
    });
};

// Método responsável por LISTAR todos os Toners
exports.listAllToners = async (req, res) => {
    const response = await db.query('SELECT * FROM toners ORDER BY model ASC');
    res.status(200).send(response.rows);
};

// Método responsável por ENCONTRAR um Toner pelo seu ID
exports.findTonerById = async (req, res) => {
    const tonerId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM toners WHERE id = $1', [tonerId]);

    res.status(200).send(response.rows);
};

// Método responsável por ATUALIZAR um Toner pelo seu ID
exports.updateTonerById = async (req, res) => {
    const tonerId = parseInt(req.params.id);
    const {
        model,
        quant
    } = req.body;

    const response = await db.query(
        `UPDATE toners SET
            model = $1,
            quant = $2
        WHERE
            id = $3`,
        [
            model,
            quant,
            tonerId
        ]
    );

    res.status(200).send({ message: 'Toner updated successfully!' });
};

// Método responsável por DELETAR um Toner pelo seu ID
exports.deleteTonerById = async (req, res) => {
    const tonerId = parseInt(req.params.id);
    await db.query('DELETE FROM toners WHERE id = $1', [tonerId]);

    res.status(200).send({ message: 'Toner deleted successfully!' });
};
