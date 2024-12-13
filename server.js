const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const formatProductData = (data: any): Product => ({
    id: data.id,
    name: data.name,
    price: data.price,
    imageUrl: data.image || '', // Підтримка для поля image
  });
  
// Підключення до PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Тестовий маршрут
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Маршрут для отримання продуктів
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
