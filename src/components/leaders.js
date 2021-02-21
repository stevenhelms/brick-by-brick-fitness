import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import { useAppContext } from '../services/context'
import { H2, Heading, FlexRow, Container, colors } from '../utils/styles'
import { sortByTotalPoints } from '../services/sort'

const MyContainer = styled.div`
    flex: 1;
    margin-right: 20px;
    @media screen and (max-width: 480px) {
        margin-right: 0px;
    }
`

const Leaders = ({ data, isReady }) => {
    const { state } = useAppContext()
    const [leaders, setLeaders] = useState({})
    const [myRanking, setMyRanking] = useState(false)

    useEffect(() => {
        if (!isReady || typeof data === 'undefined') {
            return
        }

        const items = []
        data.forEach(person => {
            if (person?.totals?.points) {
                items.push(person)
            }
        })
        // console.log(items)
        items.sort((a, b) => sortByTotalPoints(a, b)) // Sort decending

        items.forEach((person, idx) => {
            if (person.email === state.profile.email) {
                // My position in the group
                setMyRanking(idx + 1)
            }
        })
        setLeaders(items.slice(0, 10)) // Only the Top 10
    }, [state.profile.email, data, isReady])

    return (
        <MyContainer>
            <Heading>
                <H2>Leaders (total points)</H2>
            </Heading>
            <Container style={{ flexDirection: 'column', padding: '0 20px' }}>
                <FlexRow style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                    <div style={{ flex: 1 }}>Rank</div>
                    <div style={{ flex: 2 }}>Name</div>
                    <div style={{ flex: 2 }}>Total Points</div>
                </FlexRow>
                {isReady && typeof leaders !== 'undefined' && Object.keys(leaders).length > 0 ? (
                    leaders.map((leader, i) => {
                        if (!leader.totals) {
                            // No journal entries yet which builds totals
                            return null
                        }
                        return (
                            <FlexRow key={i} style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                                <div style={{ flex: 1 }}>{i + 1}</div>
                                <div style={{ flex: 2 }}>
                                    {i < 5 ? leader.first : myRanking === i + 1 ? leader.first : ''}
                                </div>
                                <div style={{ flex: 2 }}>{leader?.totals.points || 0}</div>
                            </FlexRow>
                        )
                    })
                ) : (
                    <p>Loading...</p>
                )}
                {state.profile?.totals?.points && myRanking > 10 ? (
                    <FlexRow style={{ borderBottom: '1px solid ' + colors.veryLightGray, paddingTop: '20px' }}>
                        <div style={{ flex: 1 }}>{myRanking}</div>
                        <div style={{ flex: 2 }}>My Points</div>
                        <div style={{ flex: 2 }}>{state.profile?.totals.points}</div>
                    </FlexRow>
                ) : null}
            </Container>
        </MyContainer>
    )
}

export default Leaders
