/*jshint esversion: 6 */

const product = require("../models/product");

module.exports = (req, res)=>{
    let datoModificar = req.params.productId;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);
    product.findOneAndUpdate(datoModificar, update, (err, productos) =>{
        if(err) return res.status(500).send({
            message: `Error al actualizar el producto ${err}`
        });
        if(!productos) /* Viene vacio */ return res.status(404).send({
            message: 'No existe el producto'
        });
        res.status(200).send({
            productos
        });
    })
}