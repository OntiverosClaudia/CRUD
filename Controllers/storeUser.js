/*jshint esversion: 6 */
// Variables que necesitamos
const User = require('../models/user'); // Objeto del modelo
const path = require('path');

module.exports = (req, res)=>{
    let user = new User(); 
    user.username = req.body.username;
    user.password = req.body.password;
    user.save((error, user) =>{
        if(error){
            return res.redirect('/user/register');
        };
        res.redirect('/'); // Te lleva al index
    });
}