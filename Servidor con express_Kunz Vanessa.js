// app.js

const express = require('express');
const ProductManager = require('./src/ProductManager'); // Ajusta la ruta según tu estructura de carpetas

const app = express();
const port = 3000; // Puedes ajustar el puerto según tus necesidades

const productManager = new ProductManager();

// Endpoint para obtener la lista de productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getProducts();

  // Aplicar límite si se proporciona
  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
