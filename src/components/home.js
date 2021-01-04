import React, { useState, useEffect } from 'react'
import firebase from 'gatsby-plugin-firebase'
// import { isLoggedIn } from '../services/auth-firebase'

import { Container, H2, Ul, Li } from '../utils/styles'

const Leaders = () => {
    return (
        <Container>
            <H2>Leaders</H2>
            <Ul>
                <Li>None</Li>
            </Ul>
        </Container>
    )
}

const Players = () => {
    const [players, setPlayers] = useState([])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
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
    }, [])

    return (
        <Container>
            <H2>Players</H2>
            <Ul>
                {isReady ? (
                    <>
                        {players.map((player, i) => (
                            <Li key={i}>{player.first}</Li>
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Ul>
        </Container>
    )
}

const Home = () => (
    <>
        <H2>Welcome to the Bear State Winter 2021 Nutrition Challenge.</H2>
        <Leaders />
        <Players />
    </>
)

export default Home
