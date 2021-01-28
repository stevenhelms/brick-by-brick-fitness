import React, { useEffect, useState, createRef, useRef } from 'react'
import firebase from 'gatsby-plugin-firebase'

import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryLabel,
    VictoryGroup,
    VictoryLegend,
} from 'victory'

const GraphSleep = ({ graph = undefined }) => {
    const [data, setData] = useState(undefined)
    const [graphData, setGraphData] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    const calculateSleep = d => {
        let dataset = { overall: {} }

        d.forEach(user => {
            if (user?.journal) {
                Object.keys(user.journal).forEach(date => {
                    const jDate = date.split('-')
                    const dt = new Date(jDate[0], jDate[1] - 1, jDate[2])
                    const graphDate =
                        dt.toLocaleString('default', { month: 'short' }) + '-' + ('0' + jDate[2]).slice(-2)
                    if (typeof dataset.overall[graphDate] === 'undefined') {
                        dataset.overall[graphDate] = { total: 0, count: 0, average: 0 }
                    }

                    if (user?.journal[date]) {
                        console.log(user.email)
                        console.log(user.journal[date]?.sleep)
                        dataset.overall[graphDate]['total'] += user.journal[date]?.sleep ? user.journal[date].sleep : 0
                        dataset.overall[graphDate]['count']++
                    }
                })
            }
        })

        const gData = []
        Object.keys(dataset.overall).forEach(key => {
            console.log(dataset.overall[key])
            const avg = Number(dataset.overall[key]['total']) / Number(dataset.overall[key]['count'])
            gData.push({ date: key, average: avg })
        })

        console.log(gData)
        setGraphData(gData)
    }

    useEffect(() => {
        if (typeof graph != 'undefined') {
            setData(graph)
            setIsReady(true)
        } else {
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
                    setData(p)
                    calculateSleep(p)
                    setIsReady(true)
                })
        }
    }, [graph])

    if (!isReady) {
        return null
    }

    return (
        <VictoryChart height={200} domainPadding={{ x: 60, y: 0 }} minDomain={{ y: 0 }}>
            <VictoryLine
                data={graphData}
                x="date"
                y="average"
                style={{ data: { stroke: datum => (datum?.average >= 7 ? 'green' : 'red') } }}
                // domain={{ y: [0, 10] }}
                labels={({ datum }) => datum.average.toFixed(1)}
                // labelComponent={<VictoryLabel dy={-10} />}
            />
            {/*}    data={graphData['overall']}
                    x="macro"
                    y="portions"
                    labels={({ datum }) => datum.portions}
                    // style={{ labels: { fill: 'white' } }}
                    // labelComponent={<VictoryLabel dy={30} />}
                /> */}
        </VictoryChart>
    )
}

export default GraphSleep
