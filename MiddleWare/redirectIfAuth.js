/*jshint esversion: 6 */
module.exports = (req, res, next)=>{
    if(req.session.userId){
        return res.redirect('/'); // Si se intenta loguear estando en su cuenta, se manda a home
    }
    next();
};