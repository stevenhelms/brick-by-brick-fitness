import React, { useEffect, useState } from 'react'
import firebase from 'gatsby-plugin-firebase'
// import { useAppContext } from '../services/context'

import { H2 } from '../utils/styles'
import LineChart from './linechart'
import { calcTotalPointsByDay } from '../services/calc'

const Stats = () => {
    // const { state, dispatch } = useAppContext()
    const [isReady, setIsReady] = useState(false)
    const seriesData = {}

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
                // items.sort((a, b) => b.total_points - a.total_points) // Sort decending
                // setLeaders(items.slice(0, 5)) // Only the Top 5
                seriesData['totalPointsByDay'] = calcTotalPointsByDay(items)
                setIsReady(true)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    seriesData['demo'] = [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 15 },
        { x: 4, y: 12 },
    ]
    return (
        <>
            <H2>Challenge Statistics and Insights</H2>
            {isReady ? <LineChart seriesData={seriesData['totalPointsByDay']} /> : <p>Loading...</p>}
        </>
    )
}

export default Stats
