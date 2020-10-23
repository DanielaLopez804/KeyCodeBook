const GenreModel = require ('../models/genre')

/**
 * Método para crear un nuevo genero
 * @param {*} req => Todo lo que le estamos enviando
 * @param {*} res => Respuesta que devolverá
 */

exports.create = (req,res) => {
    if (Object.entries(req.body)
    .length == 0){
        return res.status(400).send({
            message : 'Todos los campos son obligatorios'
        })
    }

    const genre= new GenreModel({
        name : req.body.name,
        status: req.body.status,
    })

    genre.save().then(
        (dataGenre) =>{
            res.send(dataGenre)
        }
    ).catch((error) =>{
        return res.status(500).send ({
            message: error.message
        })

    })
}

/**
 * Método para modificar los generos
 * @param {*} req => Todo lo que se recibe
 * @param {*} res => Respuesta que devuelve
 */
exports.update = (req,res) => {
    if(Object.entries(req.body).length == 0){
        return res,estatus(400).send({
            message:'Todos los datos deben estar llenos'
        })
    }

    const genre = {
        name : req.body.name,
        status: req.body.status
    }

   GenreModel.findByIdAndUpdate(req.params.id, genre, {new:true})

    .then(
        (genreUpdate) => {
            res.send(genreUpdate)
        }
    )
    .catch(
        (error) => {
            return res.status(500).send({
                message: error.menssage
            })
        }
    )
}