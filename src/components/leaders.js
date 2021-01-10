import React, { useState, useEffect } from 'react'
import firebase from 'gatsby-plugin-firebase'
import styled from '@emotion/styled'

import { H2, Heading, FlexRow, Container, colors } from '../utils/styles'

const MyContainer = styled.div`
    flex: 1;
    margin-right: 20px;
    @media screen and (max-width: 480px) {
        margin-right: 0px;
    }
`

const Leaders = ({ ...rest }) => {
    const [leaders, setLeaders] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            // .orderByChild('total_points')
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    // console.log(item.val())
                    items.push(item.val())
                })
                items.sort((a, b) => b.total_points - a.total_points) // Sort decending
                setLeaders(items.slice(0, 5)) // Only the Top 5
                setIsReady(true)
            })
    }, [])

    return (
        <MyContainer>
            <Heading>
                <H2>Leaders</H2>
            </Heading>
            {/* <LineChart /> */}
            <Container style={{ flexDirection: 'column', padding: '0 20px' }}>
                {isReady ? (
                    leaders.map((leader, i) => (
                        <FlexRow key={i} style={{ borderBottom: '1px solid ' + colors.veryLightGray }}>
                            <div style={{ flex: 1 }}>{leader.first}</div>
                            <div style={{ flex: 1 }}>{leader.total_points || 0}</div>
                        </FlexRow>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </MyContainer>
    )
}

export default Leaders
