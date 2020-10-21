module.exports=(app) => {
    const user = require('../controllers/user')
    app.post('/user/create', user.create)
    app.put('/user/update/:id', user.update)
}

/**:id => Con los dos punto estamos indicando que es un parametro */