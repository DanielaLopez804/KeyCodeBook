const BookModel = require('../models/book')


/**
 * Método para registrar un nuevo libro
 * @param {*} req => Todo lo que se recibe
 * @param {*} res => Respuesta que devuelve
 */
exports.create = (req,res) => {
    if(Object.entries(req.body).length == 0){
        return res,estatus(400).send({
            message:'Todos los datos deben estar llenos'
        })
    }

    const book = new BookModel ({
        name : req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    })

    book.save()
    .then(
        (dataBook) =>{
            res.send(dataBook)
    }) 
    .catch((error) =>{
        return res.status(500).send ({
            message: error.message
        })

    })
}

/**
 * Método para modificar la informacion de un libro
 * @param {*} req => Todo lo que se recibe
 * @param {*} res => Respuesta que devuelve
 */
exports.update = (req,res) => {
    if(Object.entries(req.body).length == 0){
        return res,estatus(400).send({
            message:'Todos los datos deben estar llenos'
        })
    }

    const book = {
        name : req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    }

    BookModel.findByIdAndUpdate(req.params.id, book, {new:true})

    .then(
        (bookUpdate) => {
            res.send(bookUpdate)
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


