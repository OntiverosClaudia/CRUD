/*jshint esversion: 6 */

// Import Modules
const express = require('express');
const Product = require('../models/product') // Nuestro archivo js
const path = require('path');

// Crear objeto route
const router = express.Router();

// Exportar nuestro router
module.exports = router;

// Nuestras rutas
// Ruta de home
router.get('/', (req, res) =>{
    res.render('home');
});

router.get('/api/product', (req, res) =>{
    Product.find({}, (err, productos) => { // nombreVBD.find es "select * from"
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existen productos'
        });
        res.status(200).send({
            productos
        });
    }).lean(); // Convierte formato JSON
});

// Insertar valores en la BD. 
router.post('/api/product', (req, res) =>{
    let product = new Product(); // Instanciando un objeto
    product.name = req.body.name; // Instancia.NVariableBD
    product.picture = req.body.avatar;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;
    
    console.log(req.body); // Confirmar que manda body gg
    
    product.save((err, productStored) =>{ // Almacenar en BD (Variables que creamos)
    
    if (err) return res.status(500).send ({
    message: `Èrror al realizar la petición ${err}`
    });
    
    res.status(200).send({product:productStored});
    });
});
// Fin llenar variables

// Ontiveros Lara Claudia
// Consulta por filtro (La ruta es cualquiera que se escriba)
router.get('/api/product/:datoBusqueda', (req, res) =>{ 
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (AlgoAndaMal, productos) => { // Buscar por ID generado de forma automatica
    //Product.find({price: datoBusqueda}, (AlgoAndaMal, productos) => {
        if(AlgoAndaMal) return res.status(500).send({
            message: `Error al realizar la peticion ${AlgoAndaMal}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existe el producto'
        });
        res.status(200).send({
            productos
        });
    }).lean(); 
});

// Modificar producto (Put)
const PutProduct = require('../Controllers/putProduct');
router.put('/api/product/:productId', PutProduct);

// Ruta de login
router.get('/login', (req, res) =>{
    res.status(200).send('Soy pagina de login');
});

// Ruta  404 no encontrada. Todas las rutas son arriba de este metodo.
router.use((req, res) =>{
    res.status(404).send('Error 404, pagina no encontrada.');
});
