import React, { useEffect, useState } from 'react'
// import { getUser } from '../services/auth-firebase'
import { Link } from 'gatsby'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import Journal from './journal'
import Profile from './profile'
import { BorderDiv, Button } from '../utils/styles'

const Dashboard = () => {
    const { state, dispatch } = useAppContext()
    // const [user] = useState(getUser())
    const { user } = state
    const [profile, setProfile] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        getProfile(user.email).then(profile => {
            setProfile(profile)
            dispatch({ type: 'SET_PROFILE', value: profile })
            setIsReady(true)
        })
    }, [user.email, dispatch])

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
