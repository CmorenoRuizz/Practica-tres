var express = require('express');
var router = express.Router();
const session = require('express-session');
var datos = require("../data/dataprovider");

// Ruta pública de home (sin autenticación)
router.get('/', function(req, res) {
  const peliculas = datos.getAllPeliculas();
  res.render('home', { title: "Inicio", peliculas: peliculas, pelicula: null }); // Pasamos pelicula como null
});

// Ruta de login
router.get('/login', function(req, res) {
  res.render('login', { title: "Login" });
});

router.post('/login', function(req, res) {
  const { usuario, contrasenya } = req.body; // Obtener datos del formulario
  const user = datos.getUserByCredentials(usuario, contrasenya); // Validar credenciales

  if (user) {
    // Almacenar información del usuario en la sesión
    req.session.user = user;
    res.redirect('/homeUser'); // Redirigir a la página protegida
  } else {
    res.render('login', { title: "Login", error: "Usuario o contraseña incorrectos" });
  }
});

// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // Continúa si la sesión existe
  }
  res.redirect('/login'); // Redirige al login si no hay sesión activa
}


// Ruta protegida para usuarios autenticados (homeUser)
router.get('/homeUser', isAuthenticated, function(req, res) {
  const peliculas = datos.getAllPeliculas();
  res.render('homeUser', { title: "Inicio para Usuarios", peliculas: peliculas, user: req.session.user, pelicula: null });
});

// Ruta para detalle de película (protegida)
router.get('/:id', isAuthenticated, (req, res) => {
  const peliculas = datos.getAllPeliculas();
  const pelicula = datos.getPeliculaById(parseInt(req.params.id));
  res.render('homeUser', { title: "Detalles de Película", peliculas: peliculas, pelicula, user: req.session.user });
});

// Ruta de contacto (pública)
router.get('/contacto', function(req, res) {
  res.render('contacto', { title: "Contacto" });
});

// Ruta de logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destruyendo la sesión:', err);
      return res.redirect('/'); // Redirige al home público si ocurre un error
    }
    res.redirect('/login'); // Redirige al login después de destruir la sesión
  });
});








module.exports = router;