import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'

import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import Journal from './journal'
import { BorderDiv, Button } from '../utils/styles'
import Loading from './loading'
import Goals from './goals'

const Dashboard = () => {
    const { state, dispatch } = useAppContext()
    // const [user] = useState(getUser())
    const { user } = state
    const [profile, setProfile] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        getProfile(user.email).then(profile => {
            if (!profile && isReady) {
                navigate('/app/registration')
                return null
            } else {
                setProfile(profile)
                dispatch({ type: 'SET_PROFILE', value: profile })
                setIsReady(true)
            }
        })
    }, [user.email, dispatch, isReady])

    if (!isReady) {
        return <Loading displayText="Loading..." />
    }

    return (
        <BorderDiv>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderBottom: '1px solid #aeaeae',
                    marginBottom: '20px',
                }}
            >
                {user.photoURL ? (
                    <div style={{ flex: 1 }}>
                        <img src={user.photoURL} alt={user.displayName} />
                    </div>
                ) : null}
                <div style={{ flex: user.photoURL ? 1 : 2 }}>
                    <p>
                        {user.displayName}
                        <br />
                        {user.email}
                    </p>
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
                    <Goals user={user} profile={profile} />
                    <Journal user={user} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </BorderDiv>
    )
}

export default Dashboard
