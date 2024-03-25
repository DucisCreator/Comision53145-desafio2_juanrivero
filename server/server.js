const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('../src/Components/ProductManager');

const app = express();
const port = process.env.PORT || 5000;
const productManager = new ProductManager('productos.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/products', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = productManager.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    productManager.addProduct(product);
    res.status(201).json(product);
});

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    productManager.updateProduct(id, updatedFields);
    res.json({ message: 'Producto actualizado correctamente' });
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productManager.deleteProduct(id);
    res.json({ message: 'Producto eliminado correctamente' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});