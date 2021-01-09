import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled from '@emotion/styled'

import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import Journal from './journal'
import { BorderDiv, Button, Div, Container } from '../utils/styles'
import Loading from './loading'
import Goals from './goals'
import Leaders from './leaders'

const LeaderGoalDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    @media screen and (max-width: 480px) {
        display: block;
        // padding-left: 30px;
    }
`

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

            <LeaderGoalDiv>
                {isReady ? (
                    <>
                        <Leaders />
                        <Goals user={user} profile={profile} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </LeaderGoalDiv>
            <Container style={{ display: 'block' }}>
                {isReady ? (
                    <>
                        {/* <Goals user={user} profile={profile} /> */}
                        <Journal user={user} style={{ flex: 1, flexDirection: 'column' }} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </Div>
    )
}

export default Dashboard
