import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled from '@emotion/styled'
import firebase from 'gatsby-plugin-firebase'

import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import { Button, Div, colors, FlexRow, H1, Container } from '../utils/styles'
import Loading from './loading'
import Goals from './goals'
import Leaders from './leaders'
// import LeadersWeight from './leadersweight'
import LeadersPBF from './leaderspbf'
import GraphMacros from './graphmacros'
import GraphSleep from './graphsleep'
import GraphLine from './graphline'
import ChallengeSummary from './challengesummary'

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

const GraphDiv = styled.div`
    width: 50%;
    font-size: smaller;
    color: ${colors.typography};
    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

const DailyTips = () => {
    const [todaysTips, setTodaysTips] = useState(undefined)

    useEffect(() => {
        // Add logic for tips display
        setTodaysTips(undefined)
        // setTodaysTips(
        //     'Final results will be announced on Monday, February 22, 2021. Two winners for total points earned and two winners for total percent body fat lost will be awarded the top prizes. If you actively used this app, take a look at the graphs and charts below to see if anything stands out to you.'
        // )
    }, [])

    if (!todaysTips) {
        return null
    }

    return <DailyTipsContainer>{todaysTips} </DailyTipsContainer>
}

const Dashboard = () => {
    const { state, dispatch } = useAppContext()
    const { user } = state
    const [myProfile, setMyProfile] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [greeting, setGreeting] = useState(undefined)
    const [participants, setParticipants] = useState(undefined)
    const [participantsReady, setParticipantsReady] = useState(false)

    useEffect(() => {
        getProfile(user.email).then(profile => {
            if (!profile && isReady) {
                navigate('/app/registration')
                return null
            } else {
                setMyProfile(profile)
                dispatch({ type: 'SET_PROFILE', value: profile })
                setIsReady(true)
            }
        })
    }, [user.email, dispatch, isReady])

    useEffect(() => {
        if (myProfile?.first) {
            setGreeting(`, ${myProfile.first}`)
        } else if (user.displayName) {
            setGreeting(`, ${user.displayName}`)
        }
    }, [myProfile]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        methods.getUsers(setParticipants, participants).then(() => {
            setParticipantsReady(true)
        })
    }, [])

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
            <Container style={{ marginTop: 0 }}>
                <Goals user={user} profile={myProfile} />
            </Container>
            {/* <Container style={{ display: 'block' }}>
                <ChallengeSummary data={participants} isReady={participantsReady} />
            </Container> */}
            <Container>
                <Leaders data={participants} isReady={participantsReady} />
                {/* <LeadersWeight data={participants} isReady={participantsReady} /> */}
                <LeadersPBF data={participants} isReady={participantsReady} />
            </Container>
            {false && isReady ? (
                <>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphMacros title="Total Hand Portions Eaten" />
                        </GraphDiv>
                        <GraphDiv>
                            <GraphSleep title="Total Average Hours of Sleep" />
                        </GraphDiv>
                    </FlexRow>
                    <FlexRow style={{ display: 'inline-block' }}>
                        <hr />
                        <H1>Stress</H1>
                        <Div>
                            When you think about your stress, do any of the graphs below correlate with your stress? If
                            you sleep more or drink more, does that help? Is there any correlation? Is there a pattern
                            you notice?
                        </Div>
                        <Div style={{ color: colors.typography, marginTop: '20px', fontSize: 'smaller' }}>
                            The Food graphs compare your overall consistency for meeting your food goals for the day.
                            It's the ability to hit each of the goals given to you (proteins, carbs, fats, veggies) and
                            quantifies that as a single value. If there is a number over 100%, it represents you getting
                            more food than the goal specified.
                        </Div>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphLine line1="sleep" line2="stress" title="Sleep vs. Stress" isReady={isReady} />
                            Does sleep help moderate your stress?
                        </GraphDiv>
                        <GraphDiv>
                            <GraphLine line1="water" line2="stress" title="Water vs. Stress" isReady={isReady} />
                            Water may not have a direct correlation with stress. Is there anything you notice? Do you
                            tend to drink more or less when stressed?
                        </GraphDiv>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphLine line1="food" line2="stress" title="Food vs. Stress" isReady={isReady} />
                            Do you eat more or less when stressed? The same?
                        </GraphDiv>
                        <GraphDiv>
                            <GraphLine line1="workout" line2="stress" title="Workout vs. Stress" isReady={isReady} />
                            Exercise is said to reduce stress. Is there any correlation between the two in your data?
                        </GraphDiv>
                    </FlexRow>
                    <FlexRow style={{ display: 'inline-block' }}>
                        <hr />
                        <H1>Recovery</H1>
                        <Div>
                            Similar to stress, our recovery is greatly affected by our food choices, sleep, and other
                            factors that we can control. Do any of the graphs below correlate with your recovery? If you
                            sleep more or drink more, does that help? Is there any correlation? Is there a pattern you
                            notice?
                        </Div>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphLine line1="sleep" line2="recovery" title="Sleep vs. Recovery" isReady={isReady} />
                            When you sleep well, is your recovery better? same? worse?
                        </GraphDiv>
                        <GraphDiv>
                            <GraphLine line1="water" line2="recovery" title="Water vs. Recovery" isReady={isReady} />
                            How is your water intake affecting your recovery?
                        </GraphDiv>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphLine line1="food" line2="recovery" title="Food vs. Recovery" isReady={isReady} />
                            When you eat well, is your recovery better? same? worse?
                        </GraphDiv>
                        <GraphDiv>
                            <GraphLine
                                line1="workout"
                                line2="recovery"
                                title="Workout vs. Recovery"
                                isReady={isReady}
                            />
                            How do you recover the day after a workout? Good? Bad? Same?
                        </GraphDiv>
                    </FlexRow>

                    <FlexRow style={{ display: 'inline-block' }}>
                        <hr />
                        <H1>Misc</H1>
                        <Div>
                            These are random graphs that didn't fit the other categories. Contact me if you want to see
                            additional comparisons.
                        </Div>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <GraphDiv>
                            <GraphLine line1="workout" line2="sleep" title="Workout vs. Sleep" isReady={isReady} />
                            Do workouts help you sleep better or no?
                        </GraphDiv>
                    </FlexRow>
                    <FlexRow mobileColumn>
                        <p style={{ color: colors.typographyGrayed, fontSize: 12, marginTop: '20px' }}>
                            NOTICE: Correlation calculations are performed using the standard Pearson Correlation
                            Coefficient. It's important to remember that <b>correlation does not imply causation</b>.
                            Your results may vary and these numbers may or may not be helpful.
                        </p>
                    </FlexRow>
                </>
            ) : null}
        </Div>
    )
}

export default Dashboard

const methods = {
    getUsers: async (setter, val) => {
        await firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    items.push(item.val())
                })
                setter(items)
                if (items !== val) {
                    console.log('useEffect, snapshot, items', items)
                }
                // if (items && typeof val !== 'undefined') {
                //     console.log('participants', val)
                //     // setParticipantsReady(true)
                // }
            })
    },
}
