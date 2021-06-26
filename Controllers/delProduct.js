/*jshint esversion: 6 */

const product = require("../models/product");

module.exports = (req, res) => {
    let DatoEliminar = req.params.productId;
    product.findById(DatoEliminar, (err, product) => {
        if(err) return res.status(500).send({message: `Error al borrar el producto ${err}`})
        
        product.remove( err => {
            if(err) return res.status(500).send({message: `Error al borrar el producto ${err}`});
            /* res.status(200).send({
                message: 'El producto ha sido eliminado'
            }); */
            res.redirect('/api/product'); // Te lleva a la tabla de productos
        });
    });
};