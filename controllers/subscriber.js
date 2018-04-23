var subscriber = {}

/**************************************************/

subscriber.saveSubscriber = (jSubscriberData, fCallback) => {
    var jSubscriber = {
        email: jSubscriberData.txtSubscriberEmail,
        firstName: jSubscriberData.txtSubscriberFirstName,
        lastName: jSubscriberData.txtSubscriberLastName,
        address: {
            type: "Point",
            coordinates: [parseFloat(jSubscriberData.lng), parseFloat(jSubscriberData.lat)]
        }
    }
    global.db.collection('subscribers').insertOne(jSubscriber, (err, jResult) => {

        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> saveSubscriber -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        var jOk = {
            "status": "ok",
            "message": "user.js ->  subscriber saved -> 000"
        }
        return fCallback(false, jOk)
    })
}

/**************************************************/

subscriber.getSubscribers = (fCallback) => {
    global.db.collection('subscribers').find({
        address: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [12.549991607666, 55.701374180044]
                }
            }
        }
    }).toArray((err, ajSubscribers) => {
        if (err) {
            var jError = {
                "status": "error",
                "message": "ERROR -> getSubscribers -> user.js -> 001"
            }
            return fCallback(false, jError)
        }
        return fCallback(false, ajSubscribers)
        console.log(ajSubscribers);
    })
}

/**************************************************/

module.exports = subscriber