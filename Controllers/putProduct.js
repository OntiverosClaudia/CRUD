/*jshint esversion: 6 */

const product = require("../models/product");

module.exports = (req, res)=>{
    let datoModificar = req.params.productId;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);
    product.findByIdAndUpdate(datoModificar, update, (err, productos) =>{
        if(err) return res.status(500).send({
            message: `Error al actualizar el producto ${err}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existe el producto'
        });
        console.log(req.body); // Confirmar que manda body gg
        //res.status(200).send({ productos }); Nos muestra la modificacion
        res.redirect('/api/product'); // Te manda a la tabla de productos
    })
}