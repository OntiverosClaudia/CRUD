/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Instalar libreria: npm i --save bcrypt
const bcrypt = require('bcrypt'); // Cargar modulo

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//Encriptar contraseña
UserSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash;
        next();
    });
});

// export model
const User = mongoose.model('User', UserSchema);

module.exports = User;