var user = {}

/**************************************************/

user.signupUser = (jUserData, fCallback) => {

    var jUser = {
        userRole: "admin", // for dummy to perform CRUD as an admin
        userName: jUserData.txtUserEmailorPhoneNumber,
        firstName: jUserData.txtUserFirstName,
        lastName: jUserData.txtUserLastName,
        password: jUserData.txtUserPassword,
        image: global.sSignupUserImagePath
    }
    global.db.collection('users').insertOne(jUser, (err, jResult) => { 
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> signupUser -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> user signed up -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

user.loginUser = (jUserData, fCallback) => {
    var jUser = {
        userName: jUserData.txtUserEmailorPhoneNumber,
        password: jUserData.txtUserPassword
    }
    global.db.collection('users').findOne(jUser, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> loginUser -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jUserId = jResult._id
        var jUserRole = jResult.userRole
        var jUserName = jResult.userName
        var jUserFirstName = jResult.firstName
        var jUserLastName = jResult.lastName
        var jUserImage = jResult.image
        var jOk = {
            "status": "ok",
            "message": "user.js -> user logged in -> 000",
            _id: jUserId,
            userName: jUserName,
            firstName: jUserFirstName,
            lastName: jUserLastName,
            image: jUserImage,
            userRole: jUserRole
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

user.createUser = (jUserData, fCallback) => {

    var jUser = {
        userRole: jUserData.txtUserRole,
        userName: jUserData.txtUserEmailorPhoneNumber,
        firstName: jUserData.txtUserFirstName,
        lastName: jUserData.txtUserLastName,
        password: jUserData.txtUserPassword,
        image: global.sCreateUserImagePath
    }
    global.db.collection('users').insertOne(jUser, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> createUser -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> user created -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

user.getUsers = (fCallback) => {
    global.db.collection('users').find().toArray((err, ajUsers) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> getUsers -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        return fCallback(false, ajUsers)
    })
}
/**************************************************/

user.updateAccount = (jUserData, fCallback) => {
    var jUser = {
        userName: jUserData.txtUserEmailorPhoneNumber,
        firstName: jUserData.txtUserFirstName,
        lastName: jUserData.txtUserLastName,
        password: jUserData.txtUserPassword,
        image: global.sUpdateAccountImagePath
    }
    var userObjectId = global.mongoId(jUserData.txtUserId)
    global.db.collection('users').findOneAndUpdate({
        "_id": userObjectId
    }, {
        $set: jUser
    }, {
        returnOriginal: false
    }, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> updateAccount -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jNewUserId = jResult.value._id
        var jNewUserRole = jResult.value.userRole
        var jNewUserName = jResult.value.userName
        var jNewUserFirstName = jResult.value.firstName
        var jNewUserLastName = jResult.value.lastName
        var jNewUserImage = jResult.value.image
        var jOk = {
            "status": "ok",
            "message": "user.js -> account updated -> 000",
            _id: jNewUserId,
            userRole: jNewUserRole,
            userName: jNewUserName,
            firstName: jNewUserFirstName,
            lastName: jNewUserLastName,
            image: jNewUserImage,
        }
        //console.log(jResult)
        return fCallback(false, jOk)
    })
}

/**************************************************/

user.updateUser = (jUserData, fCallback) => {
    var jUser = {
        userRole: jUserData.txtUserRole,
        userName: jUserData.txtUserEmailorPhoneNumber,
        firstName: jUserData.txtUserFirstName,
        lastName: jUserData.txtUserLastName,
        password: jUserData.txtUserPassword,
        image: global.sUpdateUserImagePath
    }
    var userObjectId = global.mongoId(jUserData.txtUserId)
    global.db.collection('users').findOneAndUpdate({
        "_id": userObjectId
    }, {
        $set: jUser
    }, {
        returnOriginal: false
    }, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> updateUser -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> user updated -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

user.deleteAccount = (jUserData, fCallback) => {
    var jUser = {
        userName: jUserData.txtUserEmailorPhoneNumber,
        password: jUserData.txtUserPassword
    }
    global.db.collection('users').deleteOne(jUser, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> deleteAccount -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> account deleted -> 000"
        }
        console.log(jResult)
        return fCallback(false, jOk)
    })
}
/**************************************************/

user.deleteUser = (jProductData, fCallback) => {
    var userObjectId = global.mongoId(global.sUserId)
    global.db.collection('users').deleteOne({
        "_id": userObjectId

    }, (err, jResult) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> deleteUser -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js -> user deleted -> 000"
        }
        console.log(jResult)
        return fCallback(false, jOk)
    })
}

module.exports = user