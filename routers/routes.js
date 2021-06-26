/*jshint esversion: 6 */

// Import Modules
const express = require('express');
const Product = require('../models/product') // Nuestro archivo js
const path = require('path');
// npm i --save express-session. Libreria para cookies
const expressSession = require('express-session');
// Middleware
const authMid = require('../MiddleWare/authMiddleware');
const redirectIfAuth = require('../MiddleWare/redirectIfAuth');

// Crear objeto route
const router = express.Router();

// Exportar nuestro router
module.exports = router;

// Activacion de las sesiones (cookies). Antes del resto
router.use(expressSession({
    secret: 'ittgogalgos',
    resave: true,
    saveUninitialized: true
}));

// Variables globales
router.use((req, res, next)=>{
    res.locals.loggedIn = req.session.userId || null;
    next();
});

// Nuestras rutas
// Ruta de home
router.get('/', (req, res) =>{
    console.log(req.session); // Lo que manda Cookie
    res.render('home');
});

// Consulta de todos los datos
router.get('/api/product', authMid, (req, res) =>{
    Product.find({}, (err, productos) => { // nombreVBD.find es "select * from"
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existen productos'
        });
        //res.status(200).send({productos}); Ya no se manda a pantalla
        res.render('VerProducto', {productos})
    }).lean(); // Convierte formato JSON
});

// Insertar valores en la BD. 
router.post('/api/product', authMid, (req, res) =>{
    let product = new Product(); // Instanciando un objeto
    product.name = req.body.name; // Instancia.NVariableBD
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;
    
    product.save((err, productStored) =>{ // Almacenar en BD (Variables que creamos)
    
    if (err) return res.status(500).send ({
    message: `Error al realizar la petición ${err}`
    });
    
    //res.status(200).send({product:productStored}); Ya no va a mostrar los datos insertados
    res.redirect('/api/product');
    });
});
// Fin llenar variables

// Ontiveros Lara Claudia
// Consulta por filtro (La ruta es cualquiera que se escriba)
router.get('/api/product/:datoBusqueda', authMid, (req, res) =>{ 
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (AlgoAndaMal, productos) => { // Buscar por ID generado de forma automatica
    //Product.find({price: datoBusqueda}, (AlgoAndaMal, productos) => {
        if(AlgoAndaMal) return res.status(500).send({
            message: `Error al realizar la peticion ${AlgoAndaMal}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existe el producto'
        });
        //res.status(200).send({ productos }); Traer el producto que buscamos
        res.render('Editar', {productos}); // Mandar a mi pagina Editar.hbs
    }).lean(); 
});

// Modificar producto (Put)
const PutProduct = require('../Controllers/putProduct');
router.put('/api/product/:productId', authMid, PutProduct);

// Elimitar un registro (delete)
const delProduct = require('../Controllers/delProduct');
router.delete('/api/product/:productId', authMid, delProduct);

// Ruta de login
router.get('/login', (req, res) =>{
    res.status(200).send('Soy pagina de login');
});

// Ruta para registro de nuevos usuarios (Para ir al formulario)
const newUser = require('../Controllers/NewUser');
router.get('/user/register', redirectIfAuth, newUser);

//Metodo Post para el registro (Recibir info del formulario y guardar BD)
const NewUserController = require('../Controllers/storeUser');
router.post('/auth/register', redirectIfAuth, NewUserController);

// Rura get LogOut
const logOutController = require('../Controllers/logOut');
router.get('/auth/logout', logOutController);

// Ruta get login
const loginController = require('../Controllers/login');
router.get('/auth/login', redirectIfAuth, loginController);

// Ruta post Login
const loginUserController = require('../Controllers/loginUser');
router.post('/users/login', redirectIfAuth, loginUserController);

// Ruta formulario (insertar datos)
router.get('/Insertar', authMid, (req, res) =>{
    res.render('product');
});

// Ruta  404 no encontrada. Todas las rutas son arriba de este metodo.
router.use((req, res) =>{
    res.status(404).render('notfound');
});
