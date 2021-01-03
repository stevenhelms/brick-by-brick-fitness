import React from 'react'
import styled from '@emotion/styled'
import firebase from 'gatsby-plugin-firebase'

import { makeUserList } from '../services/calc'

const Container = styled.div`
    border: 1px solid #aeaeae;
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
`

const H2 = styled.h2`
    margin-top: 0;
`

const Ul = styled.ul`
    list-style: none;
`
const Li = styled.li`
    display: inline;
    margin-right: 30px;
`

const LeaderBoard = ({ data }) => {
    const calcLeaders = data => {
        let results
        console.log('--- calcLeaders ---')
        const users = makeUserList(data)
        console.log(users)
        data.journals.nodes.forEach(item => {
            console.log(item)
        })
        // console.log(results)
        console.log('--- calcLeaders ---')

        return results
    }

    const db = firebase.database()

    db.ref('/winter21')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(score => {
                console.log(score.id, ' => ', score.data())
            })
            console.log(snapshot.val())
        })

    const leaders = [] // calcLeaders(data)
    console.log(leaders)

    return (
        <Container>
            <H2>Leader Board</H2>
            <Ul>
                {leaders.map((leader, idx) => {
                    return <Li key="{idx}">{leader.total_points}</Li>
                })}
            </Ul>
        </Container>
    )
}

export default LeaderBoard
