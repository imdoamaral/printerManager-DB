const { restart } = require('nodemon');
const { parse } = require('pg-protocol');
const db = require('../config/database');

// Método responsável por CRIAR um novo Proprietário
exports.createProprietor = async (req, res) => {
    const { name, contact } = req.body;

    await db.query(
        `INSERT INTO proprietors(
            name,
            contact
        ) VALUES ($1, $2)`,
        [
            name,
            contact
        ]
    );

    res.status(201).send({
        message: 'Proprietor added successfully!',
        body: {
            proprietor: {
                name,
                contact
            }
        }
    });
};

// Método responsável por LISTAR todos os Proprietários
exports.listAllProprietors = async (req, res) => {
    const response = await db.query('SELECT * FROM proprietors ORDER BY name ASC');
    res.status(200).send(response.rows);
};

// Método responsável por ENCONTRAR um Proprietário pelo seu ID
exports.findProprietorById = async (req, res) => {
    const proprietorId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM proprietors WHERE id = $1', [proprietorId]);

    res.status(200).send(response.rows);
};

// Método responsável por ATUALIZAR um Proprietário pelo seu ID
exports.updateProprietorById = async (req, res) => {
    const proprietorId = parseInt(req.params.id);
    const { name, contact } = req.body;

    await db.query(
        `UPDATE proprietors SET
            name = $1,
            contact = $2
        WHERE
            id = $3`,
        [
            name,
            contact,
            proprietorId
        ]
    );

    res.status(200).send({ message: 'Proprietor updated successfully!' });
};

// Método responsável por DELETAR um Proprietário pelo seu ID
exports.deleteProprietorById = async (req, res) => {
    const proprietorId = parseInt(req.params.id);

    await db.query(
        `DELETE FROM proprietors WHERE id = $1`, [proprietorId]
    );

    res.status(200).send({ message: 'Proprietor deleted successfully!' });
};