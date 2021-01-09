const functions = require('firebase-functions')

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

const calcTotals = (data, field) => {
    let sum = 0
    Object.keys(data).forEach(key => {
        sum += Number(data[key][field]) || 0
    })
    console.log(`calcTotals(${field}): ${sum}`)
    return sum
}

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

            // Capture total points achieved
            let points = calcTotals(data, 'total_points')
            change.after.ref.parent.parent.child('totals/points').set(points)
            change.after.ref.parent.parent.child('totals_points').set(points) // legacy

            points = calcTotals(data, 'protein')
            change.after.ref.parent.parent.child('totals/protein').set(points)

            points = calcTotals(data, 'carbs')
            change.after.ref.parent.parent.child('totals/carbs').set(points)

            points = calcTotals(data, 'fats')
            change.after.ref.parent.parent.child('totals/fats').set(points)

            points = calcTotals(data, 'veggies')
            change.after.ref.parent.parent.child('totals/veggies').set(points)

            points = calcTotals(data, 'water')
            change.after.ref.parent.parent.child('totals/water').set(points)

            points = calcTotals(data, 'sleep')
            change.after.ref.parent.parent.child('totals/sleep').set(points)

            points = calcTotals(data, 'eat_slowly')
            change.after.ref.parent.parent.child('totals/eat_slowly').set(points)

            return 0
        })
        .catch(err => {
            const msg = `Failed to retrieve /users/${userId}/journal`
            console.log(msg)
            console.log(err)
            return msg
        })

    return sum
})
