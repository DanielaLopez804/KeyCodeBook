const mongoose = require('mongoose');

const bookShema = new mongoose.Schema({
    name :{type:String, required:true}, //Nombre del libro
    author:{type:String, required:true}, // Nombre del autor del libro
    pageNumber:{type:Number}, //Número de páginas
    publisher:{type:String, required:true}, //Editorial
    publicationDate:{type:Date}, //Fecha de publicacion
    /*genre: 
    { type: mongooose.Schema.Types.ObjectId, ref :'Genre'} //un libro puede tener un solo genero*/
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref :'Genre'}]//un libro puede tener muchos generos
})

module.exports = mongoose.model('Book',bookShema)
//lo exportamos para que en otro lado lo usemos de forma facil.