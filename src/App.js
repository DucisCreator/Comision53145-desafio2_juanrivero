import React, { useState, useEffect } from 'react';
import ProductManager from './Components/ProductManager';

function App() {
  const [productManager, setProductManager] = useState(new ProductManager('productos.json'));

  useEffect(() => {
    console.log(productManager.getProducts());

    productManager.addProduct({
      title: 'Honor Magic 5 Pro',
      description: 'Poderoso gama alta que te rendirá en lo que quieras',
      price: 1000,
      thumbnail: 'https://www.notebookcheck.org/fileadmin/Notebooks/Honor/Magic5_Pro/Bild_Honor_Magic5_Pro_4964.jpg',
      code: 'HM5P',
      stock: 50
    });
    productManager.addProduct({
      title: 'Realme GT Neo 5',
      description: 'Gama media premium con el poder de un gama alta',
      price: 700,
      thumbnail: 'https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/realmegtneo5teaser16.jpg',
      code: 'RGTN5',
      stock: 100
    });
    productManager.addProduct({
      title: 'Poco F4',
      description: 'Poder a precio de derribo',
      price: 300,
      thumbnail: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-f4-5g-02.jpg',
      code: 'PF4',
      stock: 200
    });

    console.log(productManager.getProductById(2));
  }, []);

  return (
    <div className="App">
      <h1>Product Manager</h1>
    </div>
  );
}

export default App;
