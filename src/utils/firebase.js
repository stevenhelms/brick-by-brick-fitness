import firebase from 'gatsby-plugin-firebase'

export const emailToKey = email => {
    // Strip out all spaces.
    // Convert periods to dashes.
    return email.replace(/\s/g, '').replace(/\./g, '-')
}

export const getProfile = email => {
    const userId = emailToKey(email)
    return firebase
        .database()
        .ref('/users/' + userId)
        .get()
        .then(snapshot => {
            return snapshot.val()
        })
}
