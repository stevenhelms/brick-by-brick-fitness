import React, { useState, useEffect } from 'react'
import firebase from 'gatsby-plugin-firebase'
import styled from '@emotion/styled'

import { useAppContext } from '../services/context'
import { H2, Heading, FlexRow, Container, colors } from '../utils/styles'

const MyContainer = styled.div`
    flex: 1;
    margin-right: 20px;
    @media screen and (max-width: 480px) {
        margin-right: 0px;
    }
`
const sortByTotalPoints = (a, b) => {
    if (a.totals?.points && b.totals?.points) {
        return b.totals.points - a.totals.points
    } else if (!a.totals?.points) {
        return -1
    } else {
        return 1
    }
}

const Leaders = ({ ...rest }) => {
    const { state } = useAppContext()
    const [leaders, setLeaders] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    const person = item.val()
                    if (person?.totals?.points) {
                        items.push(person)
                    }
                })
                // console.log(items)
                items.sort((a, b) => sortByTotalPoints(a, b)) // Sort decending
                setLeaders(items.slice(0, 5)) // Only the Top 5
                // console.log(leaders)
                setIsReady(true)
            })
    }, [])

    return (
        <MyContainer>
            <Heading>
                <H2>Leaders</H2>
            </Heading>
            <Container style={{ flexDirection: 'column', padding: '0 20px' }}>
                {isReady ? (
                    leaders.map((leader, i) => {
                        if (!leader.totals) {
                            // No journal entries yet which builds totals
                            return null
                        }
                        return (
                            <FlexRow key={i} style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                                <div style={{ flex: 1 }}>{leader.first}</div>
                                <div style={{ flex: 1 }}>{leader?.totals.points || 0}</div>
                            </FlexRow>
                        )
                    })
                ) : (
                    <p>Loading...</p>
                )}
                {state.profile?.totals?.points ? (
                    <FlexRow style={{ borderBottom: '1px solid ' + colors.veryLightGray, paddingTop: '20px' }}>
                        <div style={{ flex: 1 }}>My Points</div>
                        <div style={{ flex: 1 }}>{state.profile?.totals.points}</div>
                    </FlexRow>
                ) : null}
            </Container>
        </MyContainer>
    )
}

export default Leaders
