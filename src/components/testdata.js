import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { emailToKey } from '../utils/firebase'

const testUsers = [
    {
        first: 'Steven',
        last: 'Helms',
        email: 'steven.helms@gmail.com',
        journal: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        first: 'Ford',
        last: 'helms',
        email: 'ford@shelms.dev',
        journal: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
]

const testJournalEntries = [
    {
        veggies: 8,
        water: 60,
        carbs: 6,
        protein: 4,
        journalDate: '2020-12-31',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },

    {
        water: 80,
        veggies: 8,
        journalDate: '2021-01-01',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },

    {
        water: 72,
        veggies: 8,
        carbs: 5,
        protein: 4,
        journalDate: '',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
]

const TestData = () => {
    console.log('-=-=- TEST DATA -=-=-')
    const today = new Date().toISOString().substr(0, 10)

    testUsers.forEach(user => {
        const userId = emailToKey(user.email)
        firebase
            .database()
            .ref('users/' + userId)
            .set(user)

        // Create a new post reference with an auto-generated id
        // var postListRef = firebase.database().ref('users/' + userId + '/journal')

        testJournalEntries.forEach(journal => {
            var journalKey = journal.journalDate || today
            journal.journalDate = journalKey
            // var newPostRef = postListRef.push()
            firebase
                .database()
                .ref('users/' + userId + '/journal/' + journalKey)
                .set(journal)
        })
        // const newJournalKey = firebase
        //     .database()
        //     .ref('users/' + userId)
        //     .child('journal')
        //     .push().key
        // console.log(`new journal key ${newJournalKey}`)
        // https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields

        const emailRef = firebase.database().ref('users/' + userId + '/email')
        emailRef.on('value', snapshot => {
            console.log(snapshot.val())
        })
    })

    return (
        <div>
            <h1>Test Data Loader</h1>
            <p style={{ color: 'orange' }}>Test Data is being loaded...</p>
        </div>
    )
}

export default TestData
