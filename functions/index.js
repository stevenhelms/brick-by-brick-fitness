const functions = require('firebase-functions')

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.calcTotalUserPoints = functions.database.ref('/users/{userId}/journal/{entry}').onWrite((change, context) => {
    const userId = context.params.userId

    // The item was deleted so we bail out.
    if (!change.after.exists()) {
        return null
    }

    const original = change.after.val()
    // Log original information for debugging
    console.log('calcTotalPoints', userId, original)

    const sum = admin
        .database()
        .ref('/users/' + userId + '/journal')
        .once('value')
        .then(snap => {
            const data = snap.val()
            // console.log(data)
            let sum = 0
            Object.keys(data).forEach(key => {
                // console.log(key)
                // console.log(data[key])
                sum += Number(data[key].total_points) || 0
                // console.log(`sum ${sum}`)
                // return sum
            })
            console.log(`calculated sum: ${sum}`)
            change.after.ref.parent.parent.child('total_points').set(sum)
            return sum
        })
        .catch(err => {
            const msg = `Failed to retrieve /users/${userId}/journal`
            console.log(msg)
            console.log(err)
            return msg
        })

    return sum
})
