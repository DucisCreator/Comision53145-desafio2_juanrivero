const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.lastId = 0;
        this.loadProductsFromFile();
    }

    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (Array.isArray(this.products) && this.products.length > 0) {
                this.lastId = this.products[this.products.length - 1].id;
            }
        } catch (error) {
            console.error('Error loading products from file:', error);
        }
    }

    saveProductsToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products to file:', error);
        }
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error("Ya existe un producto con el mismo código.");
            return;
        }

        this.lastId++;

        const newProduct = {
            id: this.lastId,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        };
        this.products.push(newProduct);
        this.saveProductsToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProductsToFile();
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProductsToFile();
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

module.exports = ProductManager;