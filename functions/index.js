const functions = require('firebase-functions')
const firebase = require('firebase')
// require('firebase/database')

firebase.initializeApp({
    apiKey: 'AIzaSyCziiAM1cDeMGws0hd4xDbe9mDBh-CzC6E',
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN || 'bear-state.firebaseapp.com',
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL || 'https://bear-state-default-rtdb.firebaseio.com',
    projectId: 'bear-state',
    storageBucket: 'bear-state.appspot.com',
    messagingSenderId: '383638739474',
    appId: '1:383638739474:web:830c7b2f8a1a3e83af56cb',
    measurementId: 'G-ZGS9M1PCKQ',
})

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
    // console.log(change)
    // console.log(context)

    const userId = context.params.userId
    // const journalEntry = context.params.entry

    // The item was deleted so we bail out.
    if (!change.after.exists()) {
        return null
    }

    const original = change.after.val()
    // Do we really care? We're not updating it.
    // Log original information for debugging
    console.log('calcTotalPoints', userId, original)

    const updateTotal = total => {
        console.log(`updateTotal to ${total}`)
        firebase
            .database()
            .ref('users/' + userId)
            .update({ total_points: total })
            .catch(error => {
                console.log(error)
                return error
            })
        return total
    }

    firebase
        .database()
        .ref('users/' + userId + '/journal')
        .once('value')
        .then(snapshot => {
            const data = snapshot.val()
            // console.log(data)
            let sum = 0
            Object.keys(data).forEach(key => {
                // console.log(key)
                // console.log(data[key])
                sum += Number(data[key].total_points) || 0
                // console.log(`sum ${sum}`)
                // return sum
            })
            // console.log(`sum sum ${sum}`)
            updateTotal(sum)
            return sum
        })
        .catch(() => {
            const msg = `Failed to retrieve users/${userId}/journal`
            console.log(msg)
            return msg
        })

    return 0
})
