import React, { useEffect, useState } from 'react'
import firebase from 'gatsby-plugin-firebase'

import { VictoryLine, VictoryChart } from 'victory'

const GraphSleep = () => {
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
                calculateSleep(p)
                setIsReady(true)
            })
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <VictoryChart data-testid="sleep-chart" height={200} domainPadding={{ x: 60, y: 0 }} minDomain={{ y: 0 }}>
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
