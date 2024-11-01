// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verificar la conexión a la base de datos
async function verifyConnection() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Llama a la función de verificación al iniciar el servidor
verifyConnection();

// Resto de tu código de endpoints
app.get('/api/gastro', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gastro');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de gastro:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
