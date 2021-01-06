import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'

import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import Journal from './journal'
import { BorderDiv, Button, Div } from '../utils/styles'
import Loading from './loading'
import Goals from './goals'

const Dashboard = () => {
    const { state, dispatch } = useAppContext()
    // const [user] = useState(getUser())
    const { user } = state
    const [profile, setProfile] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [greeting, setGreeting] = useState(undefined)

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

    useEffect(() => {
        if (profile.first) {
            setGreeting(`, ${profile.first}`)
        } else if (user.displayName) {
            setGreeting(`, ${user.displayName}`)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!isReady) {
        return <Loading displayText="Loading..." />
    }

    return (
        <Div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>Welcome back{greeting}!</h4>
                <Link to="/app/profile" style={{ fontSize: 'smaller', color: '#999999' }}>
                    Profile
                </Link>
                <Link to="/app/create">
                    <Button>Create Journal</Button>
                </Link>
            </div>

            <BorderDiv>
                {isReady ? (
                    <>
                        <Goals user={user} profile={profile} />
                        <Journal user={user} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </BorderDiv>
        </Div>
    )
}

export default Dashboard
