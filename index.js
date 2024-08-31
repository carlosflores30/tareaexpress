const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear solicitudes JSON

// Datos de ejemplo
let clientes = [
  { id: 1, name: 'Carlos' },
  { id: 2, name: 'Max' },
  { id: 3, name: 'Maria' },
];

let productos = [
  { id: 1, name: 'Inka kola', price: 3 },
  { id: 2, name: 'Red Bull', price: 8 },
  { id: 3, name: 'Laptop', price: 3000 },
];

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a esta Aplicación en Express!');
});

// Ruta de clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Ruta de productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Operaciones CRUD para Clientes
app.post('/clientes', (req, res) => {
  const newCliente = req.body;
  newCliente.id = clientes.length + 1;
  clientes.push(newCliente);
  res.status(201).json(newCliente);
});

app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
});

app.delete('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    const removed = clientes.splice(index, 1);
    res.json(removed);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
});

// Operaciones CRUD para Productos
app.post('/productos', (req, res) => {
  const newProducto = req.body;
  newProducto.id = productos.length + 1;
  productos.push(newProducto);
  res.status(201).json(newProducto);
});

app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(producto => producto.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(producto => producto.id === id);
  if (index !== -1) {
    const removed = productos.splice(index, 1);
    res.json(removed);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
