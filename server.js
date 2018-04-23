var express = require('express')
var app = express()
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img_webshop/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1])
    }
})
var upload = multer({
    storage: storage
})
var path = require('path');
var mongo = require('mongodb').MongoClient
global.db = null
var sDatabasePath = 'mongodb://localhost:27017/webshop'
global.mongoId = require('mongodb').ObjectID

var user = require(path.join(__dirname + '/controllers/user.js'))
var product = require(path.join(__dirname + '/controllers/product.js'))
var subscriber = require(path.join(__dirname + '/controllers/subscriber.js'))
/**************************************************/

app.use(express.static(__dirname + '/public'));

/**************************************************/

mongo.connect(sDatabasePath, (err, db) => {
    if (err) {
        console.log('ERROR 003 -> Cannot connect to the database')
        return false
    }
    global.db = db
    console.log('OK 002 -> Connected to the database')
    return true
})

/**************************************************/

app.get('/shopaholic', (req, res) => {
    res.sendFile(path.join(__dirname + '/shopaholic.html'))
})

/**************************************************/

app.get('/products', (req, res) => {
    product.getProducts((err, ajProducts) => {
        if (err) {
            return res.send('ERROR')
        }
        console.log(ajProducts)
        return res.send(ajProducts)

    })
})

/**************************************************/

app.get('/users', (req, res) => {
    user.getUsers((err, ajUsers) => {
        if (err) {
            return res.send('ERROR')
        }
        console.log(ajUsers)
        return res.send(ajUsers)

    })
})

/**************************************************/

app.get('/subscribers', (req, res) => {
    subscriber.getSubscribers((err, ajSubscribers) => {
        if (err) {
            return res.send('ERROR')
        }
        console.log(ajSubscribers)
        return res.send(ajSubscribers)

    })
})

/**************************************************/

app.post('/signup-user', upload.single('fileUserImage'), (req, res) => {
    global.sSignupUserImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    user.signupUser(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.post('/login-user', upload.none(), (req, res) => {
    user.loginUser(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.post('/save-subscriber', upload.none(), (req, res) => {
    subscriber.saveSubscriber(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.post('/create-product', upload.single('fileProductImage'), (req, res) => {
    global.sProductImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    product.createProduct(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)
    })
})

/**************************************************/

app.post('/create-user', upload.single('fileUserImage'), (req, res) => {
    global.sCreateUserImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    user.createUser(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.post('/update-account', upload.single('fileUserImage'), (req, res) => {
    global.sUpdateAccountImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    user.updateAccount(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.post('/update-product', upload.single('fileProductImage'), (req, res) => {
    global.sUpdateProductImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    product.updateProduct(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})
/*******************************************************/

app.post('/update-user', upload.single('fileUserImage'), (req, res) => {
    global.sUpdateUserImagePath = req.file.path.split("public/")[req.file.path.split("public").length - 1]
    user.updateUser(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})
/**************************************************/

app.post('/delete-account', upload.none(), (req, res) => {
    user.deleteAccount(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.get('/delete-product', upload.none(), (req, res) => {
    global.sProductId = req.query.id
    product.deleteProduct(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.get('/delete-user', upload.none(), (req, res) => {
    global.sUserId = req.query.id
    user.deleteUser(req.body, (err, jResult) => {
        if (err) {
            console.log(jResult)
            return res.send(jResult)
        }
        console.log(jResult)
        return res.send(jResult)

    })
})

/**************************************************/

app.listen(3000, (err) => {
    if (err) {
        console.log('ERROR 001 -> Cannot listen to port 3000')
        return false
    }
    console.log('OK 000 -> Server listening to port 3000')
})