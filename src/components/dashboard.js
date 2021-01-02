import React, { useEffect, useState } from 'react'
import { getUser } from '../services/auth-firebase'
import { Link } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { emailToKey } from '../utils/firebase'

import Journal from './journal'
import Profile from './profile'
import { BorderDiv, Button } from '../utils/styles'

const Dashboard = () => {
    const [user] = useState(getUser())
    const [profile, setProfile] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const userId = emailToKey(user.email)

        firebase
            .database()
            .ref('/users/' + userId)
            .get()
            .then(snapshot => {
                // const items = []
                // snapshot.forEach(item => {
                //     console.log(item.val())
                //     items.push(item.val())
                // })
                console.log('--- setProfile ---')
                console.log(snapshot.val())
                setProfile(snapshot.val())
                setIsReady(true)
            })
    }, [user.email])

    return (
        <BorderDiv>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div style={{ flex: 1 }}>
                    <img src={user.photoURL} alt={user.displayName} />
                </div>
                <div style={{ flex: 1 }}>
                    <p>{user.displayName}</p>
                    <p>
                        <Link to="/app/profile">Profile</Link>
                    </p>
                </div>
                <div style={{ flex: 4 }}>
                    <p>
                        Don't forget to create your challenge journal entry today.
                        <Link to="/app/create">
                            <Button>Create Journal</Button>
                        </Link>
                    </p>
                </div>
            </div>

            {isReady ? (
                <>
                    <Journal user={user} />
                    <Profile user={user} profile={profile} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </BorderDiv>
    )
}

export default Dashboard
