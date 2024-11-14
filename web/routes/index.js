var express = require('express');
var router = express.Router();

/*var datos = require("../data/dataprovider");

router.get('/', function(req, res, next) {
  const peliculas = datos.getAllPeliculas(); 
  res.render('home', {title: "Inicio", peliculas: peliculas});
});*/

//para borrar este de abajo cuando termine, es testing
router.get('/', function(req, res, next) {   
  res.render('home', {title: "Inicio"});
});

router.get('/login', function(req, res) {
  res.render('login', { title: "Login" });
});


module.exports = router;
