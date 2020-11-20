const UserModel = require('../models/user')
const service = require('../services/index')
const nodemailer = require ('nodemailer')
const bcript = require('bcryptjs')



/**
 * Método para CREAR un nuevo usuario
 * @param {*} req => Todo lo que enviamos desde el body (formulario)
 * @param {*} res => La respuesta
 */


exports.create = (req, res) => {

    if (Object.entries(req.body).length == 0) {
        return res.status(400).send({
            menssage: 'Los datos son obligatorios'
        })
    }

    const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        /* password: req.body.password, */
        password: bcript.hashSync(req.body.password),
        role: req.body.role,
        birthday: req.body.birthday,
        age: req.body.age,
    })

    user.save()
        .then((dataUser) => {
            const contentEmail = '<h1>Hola cómo estás</h1>'
            sendEmailInfo(dataUser.email, 'Bienvenido', contentEmail, '', res)
            res.send(dataUser)
        })
        .catch((error) => {
            res.status(500).send({
                message: error.menssage
            })
        })

}

/**
 * SIEMPRE PORNERLO SI VAMOS A MANEJAR RUTAS
 * Método para ACTUALIZAR un nuevo usuario
 * @param {*} req => Todo lo que enviamos desde el body (formulario)
 * @param {*} res => La respuesta 
 */

exports.update = (req, res) => {

    /**
     * Validaos que todos los campos del formulario este lleno
     *
     */
    if (Object.entries(req.body).length == 0) {
        return res.status(400).send({
            menssage: 'Los datos son obligatorios'
        })
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        age: req.body.age,
    }

    /**
     * findByIdAndUpdate => Método de mongoose que permite buscar por id y actualicar un usuario. Tiene los parametros:
     * - el id del usuario => req.params.id es el id que se envia por la URL
     * -los datos nuevos
     */

    UserModel.findByIdAndUpdate(req.params.id, user, { new: true })
        .then(
            (userUpdate) => {
                res.send(userUpdate)
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

/**
 * Método para obtener todos los usuario
 * @param {*} req => Todo lo que se recibe
 * @param {*} res => Respuesta que devuelve
 */

exports.getAll = (req, res) => {

    UserModel.find()
        .then((users) => { res.send(users) })
        .catch((error) => {
            res.status(500).send({ message: error.message })
        })
}

/**
 * Método para obtener un usuario
 * @param {*} req => Todo lo que se recibe
 * @param {*} res => Respuesta que devuelve
 */

exports.getOne = (req, res) => {
    UserModel.findById(req.params.id)

        .then((user) => { res.send(user) })
        .catch((error) => {
            res.status(500).send({ message: error.message })
        })
}

exports.deleteOne = (req, res) => {
    UserModel.findByIdAndRemove(req.params.id)
        .then((user) => { res.send(user) })
        .catch((error) => {
            res.status(500).send({ message: error.message })
        })
}


exports.login = (req, res) => {
    UserModel.findOne({ email: req.body.email },
        (error, dataUser) => {
            if (dataUser != null) {
               /*  if (dataUser.password == req.body.password) { */
                if(bcript.compareSync(req.body.password)){
                    res.send({ token: service.createToken(dataUser) })
                } else {
                    res.status(400).send({
                        message: 'Los datos no coinciden'
                    })
                }
            } else {
                res.status(400).send({
                    message: 'Los datos no coinciden'
                })
            }
        }
    )
}


exports.SendEmail =(req,res) =>{
    const email = req.query.email 
    const name = req.query.name
    requirements(email,name,res)

}

const requirements = (email,name,res) => {

    const contentEmail = `<h1>Mensaje desde el formulario de contacto</h1>
        Hola, hemos recibido un mensaje de ${name} con el correo ${email}, por favor comunicate.`

        sendEmailInfo('dl7241140@gmail.com','Formulario contacto', contentEmail,'',res)
    }

const sendEmailInfo = (receiver, subject, contentEmail, contentTxt = '', res) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'green.life.artemisas@gmail.com',
            pass: 'greenlife12345'
        }
    })

    const configEmail = {
        from: 'Keycode Book',
        to: receiver,
        subject: subject,
        text: contentTxt,
        html: contentEmail
    }

    transport.sendMail(configEmail, (error, info) => {
        if (error){
            res.status(500).send({
                message: 'Error al enviar el correo ', error
            })
        }else{
            res.status(200).send({
                message: 'Correo enviado correctamente'
            }) 
        }
    })


}
