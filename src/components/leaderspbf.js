import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import { useAppContext } from '../services/context'
import { H2, Heading, FlexRow, Container, colors } from '../utils/styles'
import { sortByTotalPBFLoss } from '../services/sort'

const MyContainer = styled.div`
    flex: 1;
`

const LeadersPBF = ({ data, isReady }) => {
    const { state } = useAppContext()
    const [leaderboard, setLeaderboard] = useState({})
    const [myRanking, setMyRanking] = useState(false)

    useEffect(() => {
        if (!isReady || typeof data === 'undefined') {
            return
        }

        const items = []
        data.forEach(person => {
            // const person = item.val()
            // Calculate weight loss here.
            person['pbf_diff'] = Number((person.pbf_start || 0) - (person.pbf_end || person.pbf_start)).toFixed(1)
            items.push(person)
            // console.log(person)
        })
        items.sort((a, b) => sortByTotalPBFLoss(a, b)) // Sort decending
        items.forEach((person, idx) => {
            if (person.email === state?.profile.email) {
                // My position in the group
                setMyRanking(idx + 1)
            }
        })
        setLeaderboard(items.slice(0, 10)) // Only the Top 10
    }, [state?.profile?.email, data, isReady])

    // if (!isReady || typeof data === 'undefined' || Object.keys(leaderboard).length === 0) {
    //     return null
    // }

    return (
        <MyContainer>
            <Heading>
                <H2>Leaders (percent body fat, PBF)</H2>
            </Heading>
            <Container style={{ flexDirection: 'column', padding: '0 20px' }}>
                <FlexRow style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                    <div style={{ flex: 1 }}>Rank</div>
                    <div style={{ flex: 2 }}>Name</div>
                    <div style={{ flex: 2 }}>PBF Lost</div>
                </FlexRow>
                {isReady && typeof leaderboard !== 'undefined' && Object.keys(leaderboard).length > 0 ? (
                    leaderboard.map((leader, i) => {
                        return (
                            <FlexRow key={i} style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                                <div style={{ flex: 1 }}>{i + 1}</div>
                                <div style={{ flex: 2 }}>
                                    {i < 5 ? leader.first : myRanking === i + 1 ? leader.first : ''}
                                </div>
                                <div style={{ flex: 2 }}>{leader.pbf_diff || 0}%</div>
                            </FlexRow>
                        )
                    })
                ) : (
                    <p>Loading...</p>
                )}
                {state.profile?.totals?.points && myRanking > 10 ? (
                    <FlexRow style={{ borderBottom: '1px solid ' + colors.veryLightGray, paddingTop: '20px' }}>
                        <div style={{ flex: 1 }}>{myRanking}</div>
                        <div style={{ flex: 2 }}>
                            My PBF{' '}
                            {state.profile?.pbf_start - (state.profile?.pbf_end || state.profile?.pbf_start) < 0
                                ? 'Gain'
                                : 'Loss'}
                        </div>
                        <div style={{ flex: 2 }}>
                            {Math.abs(
                                state.profile?.pbf_start - (state.profile?.pbf_end || state.profile?.pbf_start)
                            ).toFixed(1)}
                            %
                        </div>
                    </FlexRow>
                ) : null}
            </Container>
        </MyContainer>
    )
}

export default LeadersPBF
