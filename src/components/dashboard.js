import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled from '@emotion/styled'

import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import Journal from './journal'
import { Button, Div, Container, colors } from '../utils/styles'
import Loading from './loading'
import Goals from './goals'
import Leaders from './leaders'

const DailyTipsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
    border: 1px solid ${colors.primaryOrange};
    border-radius: 3px;
    padding: 20px;
    @media screen and (max-width: 480px) {
        margin-left: 0;
    }
`
const LeaderGoalDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    @media screen and (max-width: 480px) {
        display: block;
        // padding-left: 30px;
    }
`

const DailyTips = () => {
    const [todaysTips, setTodaysTips] = useState(undefined)

    useEffect(() => {
        // Add logic for tips display
        setTodaysTips("I'm creating a set of frequently asked questions at http://bearstategym.com/winter21/")
    }, [])

    if (!todaysTips) {
        return null
    }

    return <DailyTipsContainer>{todaysTips} </DailyTipsContainer>
}
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
                <Link to="/app/profile" style={{ fontSize: 'smaller', color: colors.typographyGrayed, margin: '5px' }}>
                    Profile
                </Link>
                <Link to="/app/create">
                    <Button>Create Journal</Button>
                </Link>
            </div>

            <DailyTips />
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
                        <Journal limit={5} user={user} style={{ flex: 1, flexDirection: 'column' }} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </Div>
    )
}

export default Dashboard
