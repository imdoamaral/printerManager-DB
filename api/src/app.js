const express = require('express');
const cors = require('cors');

const app = express();

// Rotas da API:
const index = require('./routes/index');
const printerRoute = require('./routes/printerRoutes');
const tonerRoute = require('./routes/tonerRoutes');
const departmentRoute = require('./routes/departmentRoutes');
const proprietorRoute = require('./routes/proprietorRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', printerRoute);
app.use('/api/', tonerRoute);
app.use('/api/', departmentRoute);
app.use('/api/', proprietorRoute);

module.exports = app;