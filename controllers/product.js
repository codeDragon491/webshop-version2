var product = {}

/**************************************************/

product.createProduct = (jProductData, fCallback) => {
    var jProduct = {
        productName: jProductData.txtProductName,
        buyPrice: jProductData.nrProductPrice,
        quantityInStock: jProductData.nrProductQuantity,
        image: global.sProductImagePath
    }
    global.db.collection('products').insertOne(jProduct, (err, jResult) => {

        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> saveProduct -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> product saved -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

product.getProducts = (fCallback) => {
    global.db.collection('products').find().toArray((err, ajProducts) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> getProducts -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        return fCallback(false, ajProducts)
    })
}

/**************************************************/

product.updateProduct = (jProductData, fCallback) => {
    var jNewProduct = {
        productName: jProductData.txtProductName,
        productPrice: jProductData.nrProductPrice,
        productQuantity: jProductData.nrProductQuantity,
        productImage: global.sUpdateProductImagePath
    }
    var productObjectId = global.mongoId(jProductData.txtProductId)
    global.db.collection('products').findOneAndUpdate({
        "_id": productObjectId
    }, {
        $set: jNewProduct
    }, {
        returnOriginal: false
    }, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> updateProduct -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> product updated -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

product.deleteProduct = (jProductData, fCallback) => {
    var productObjectId = global.mongoId(global.sProductId)
    global.db.collection('products').deleteOne({
        "_id": productObjectId
    }, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> deleteProduct -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> product deleted -> 000"
        }
        console.log(jResult)
        return fCallback(false, jOk)
    })
}

/**************************************************/

module.exports = product