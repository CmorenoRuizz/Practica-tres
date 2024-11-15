var peliculas = require("./pelis.json");
var usuarios = require("./usuarios.json");

// Obtener todas las películas
function getAllPeliculas() {
    return peliculas;
}

// Obtener una película por ID
function getPeliculaById(id) {
    return peliculas.find(pelicula => pelicula.id === id);
}

// Obtener todos los usuarios
function getAllUsuarios() {
    return usuarios;
}

// Verificar credenciales de usuario
function getUserByCredentials(username, password) {
    return usuarios.find(user => user.name === username && user.password === password);
}

module.exports = {
    getAllPeliculas,
    getPeliculaById,
    getAllUsuarios,
    getUserByCredentials
};
