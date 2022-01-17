import React, { useState } from 'react'
// import { useFirebase } from 'gatsby-plugin-firebase'
import styled from '@emotion/styled'

import { H2, Heading, H3, H4, H1, Button, colors } from '../utils/styles'
import { Link } from 'gatsby'
import config from '../../config'

const TopBlock = styled.div`
    display: flex;
    @media screen and (max-width: 480px) {
        display: block;
    }
`

const RegisterTodayContainer = styled.div`
    flex: 2;
    margin-left: 40px;
    border: 1px solid ${colors.primaryOrange};
    border-radius: 3px;
    padding: 20px;
    text-align: center;
    @media screen and (max-width: 480px) {
        display: inline-grid;
        margin-left: 0;
    }
`

const PlayerContainer = styled.div`
    flex: 4;
    @media screen and (max-width: 480px) {
        margin-top: 30px;
    }
`

const PlayerList = styled.div`
    margin-bottom: 30px;
    padding: 20px 0;

    @media screen and (max-width: 480px) {
        display: inline-block;
        margin-left: 0;
    }
`

const Players = () => {
    const [players, setPlayers] = useState([])
    const [isReady, setIsReady] = useState(false)

    /* useFirebase(firebase => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const p = []
                snapshot.forEach(item => {
                    // console.log(item.val())
                    p.push(item.val())
                })
                setPlayers(p)
                setIsReady(true)
            })
    }, []) */

    return (
        <PlayerContainer>
            <Heading>
                <H2>Participants</H2>
            </Heading>
            {/* <Ul>
                {isReady ? (
                    <>
                        {players.map((player, i) => (
                            <Li key={i}>{player.first}</Li>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                </Ul> */}
            <PlayerList>
                {isReady ? (
                    <>
                        {players.map((player, i) => (
                            <div style={{ display: 'block', float: 'left', marginRight: '10px' }} key={i}>
                                {player.first}
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </PlayerList>
        </PlayerContainer>
    )
}

const RegisterToday = () => {
    const rdate = config.registrationEndDate

    if (new Date() < rdate) {
        return (
            <RegisterTodayContainer>
                <Link to="/app/login">
                    <Button>Register Today</Button>
                </Link>
                <div style={{ fontSize: 'smaller', color: colors.typographyGrayed }}>
                    Registration ends Jan-30-2022.
                </div>
            </RegisterTodayContainer>
        )
    } else {
        return (
            <RegisterTodayContainer>
                <Link to="/app/login">
                    <Button>Login</Button>
                </Link>
                <div style={{ fontSize: 'smaller', color: colors.typographyGrayed, marginBottom: 0 }}>
                    Login to track your progress.
                </div>
            </RegisterTodayContainer>
        )
    }
}

const Home = () => (
    <>
        <H1>Brick By Brick Fitness Nutrition Challenge</H1>
        <TopBlock>
            <Players />
            <RegisterToday />
        </TopBlock>
        <div style={{ marginTop: '30px' }}>
            <H3>Overview</H3>
            <p>
                Welcome! The neverending pandemic has left many people disconnected from friends and family, depressed,
                full of anxiety, and with long work hours from home or no work at all. Some may have discovered the
                "COVID 15" and found an extra 15 lbs they didn't have at the beginning. With 2022 full of some of the
                same uncertanties as the past two years, and it's time to find better healthy habits that will carry us
                through the year.
            </p>
            <p>
                Our challenge this year involves adding to your lifestyle, and not restricting. By finding sustainable
                habits you can lose the weight you found last year and be armed with the tools to keep it off.
            </p>
            <p>
                Each participant will be given a unique set of goals to meet. Progress will be measured by meeting those
                daily goals. Participants will keep a daily journal of their habits and points will be assigned to each
                day's journal entry. The journal will be kept online in this application and available at all times.
            </p>
            <p>
                At the end of the challenge, points will be totaled and prizes will be awarded. Additionally, various
                insights will be created based on your own journal. These insights may be able to correlate the various
                activities seen during the challenge. For example, you may regularly note that your stress is better
                when you sleep longer, but didn't notice that along the way.
            </p>
            <p>
                The challenge focuses on habits, but is still centered on foods. By following the prescribed eating plan
                you will lose weight in the process. The speed at which you lose weight varies and is highly dependant
                on you ability to stick to the plan.
            </p>
            <p>
                Since the challenge is focused on healthy habits and not solely on weight loss, anyone can participate
                and potentially be a winner.
            </p>
            <H4>Benefits</H4>
            <p>Each participant will:</p>
            <ul>
                <li>Receive an inBody scan at the beginning and end of the challenge.</li>
                <li>Receive custom nutrition goals (with macros).</li>
                <li>Have full access to the challenge application, personal journal.</li>
                <li>Have access to a nutrition coach for questions along the way.</li>
                <li>Learn better habits by completing the various challenges.</li>
                <li>Be able to utilize hand portions for meals and understand appropriate portions of food.</li>
                <li>Start at the same place as others. There is no advantage given to anyone.</li>
                <li>
                    Track different aspects of their day and enter them into the challenge app (this site) each day.
                    Participants may track them on paper and enter them later, but online entry is a requirement to
                    participate.
                </li>
            </ul>
            <H4>Challenge Details</H4>
            <ul>
                <li>Registration is from Monday, January 17, 2022 to Sunday, January 30, 2022.</li>
                <li>
                    There will be a kick-off meeting on <strong>Sunday, January 20, 2022</strong>.
                </li>
                <li>The challenge runs from Monday, January 31, 2022 to Sunday, February 27, 2022.</li>
                <li>Participants are expected to enter their daily progress into the journal for maximum points.</li>
                <li>The calculations supporting the point system will not be made available.</li>
                <li>Multiple prizes will be awarded at the end of the challenge.</li>
                <li>Not all prizes will be points based.</li>
                <li>Prizes will be revealed at the kick-off meeting.</li>
            </ul>
        </div>
        <RegisterToday />
    </>
)

export default Home
