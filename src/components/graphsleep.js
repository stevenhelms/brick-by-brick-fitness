import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'gatsby-plugin-firebase'
import { VictoryAxis, VictoryLine, VictoryChart, VictoryLabel, VictoryLegend } from 'victory'
import { useAppContext } from '../services/context'

const GraphSleep = () => {
    const { state } = useAppContext()
    const { profile } = state
    const [graphData, setGraphData] = useState(undefined)
    const [myData, setMyData] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    const calculateSleep = useCallback(
        d => {
            let dataset = { overall: {}, personal: {} }

            d.forEach(user => {
                if (user?.journal) {
                    Object.keys(user.journal).forEach(date => {
                        const jDate = date.split('-')
                        const dt = new Date(jDate[0], jDate[1] - 1, jDate[2])
                        const graphDate =
                            dt.toLocaleString('default', { month: 'short' }) + '-' + ('0' + jDate[2]).slice(-2)
                        if (typeof dataset.overall[graphDate] === 'undefined') {
                            dataset.overall[graphDate] = { total: 0, count: 0, average: 0 }
                            dataset.personal[graphDate] = { total: 0 }
                        }

                        if (user?.journal[date]) {
                            dataset.overall[graphDate]['total'] += user.journal[date]?.sleep
                                ? user.journal[date].sleep
                                : 0
                            dataset.overall[graphDate]['count']++
                        }

                        if (profile.email === user.email) {
                            // graph our own data also.
                            dataset.personal[graphDate]['total'] = user.journal[date]?.sleep
                                ? user.journal[date].sleep
                                : 0
                        }
                    })
                }
            })

            const gData = []
            const pData = []
            Object.keys(dataset.overall).forEach(key => {
                console.log(dataset.overall[key])
                const avg = Number(dataset.overall[key]['total']) / Number(dataset.overall[key]['count'])
                gData.push({ date: key, average: avg })
                pData.push({ date: key, total: dataset.personal[key]['total'] })
            })

            console.log(gData)
            setGraphData(gData)
            console.log(pData)
            setMyData(pData)
        },
        [profile]
    )

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
    }, [calculateSleep])

    if (!isReady) {
        return null
    }

    return (
        <VictoryChart data-testid="sleep-chart" height={200} domainPadding={{ x: 60, y: 10 }} minDomain={{ y: 0 }}>
            <VictoryLine
                data={graphData}
                x="date"
                y="average"
                interpolation={'natural'}
                style={{ data: { stroke: '#1f1f1f' } }}
                // labels={({ datum }) => datum.average.toFixed(1)}
            />

            <VictoryLine
                data={myData}
                x="date"
                y="total"
                style={{ data: { stroke: 'orange' } }}
                interpolation={'natural'}
                labels={({ datum }) => datum.total.toFixed(1)}
                labelComponent={
                    <VictoryLabel
                        text={({ datum }) => datum.total}
                        dy={20}
                        // dx={-40}
                        // angle={-45}
                        textAnchor="start"
                        verticalAnchor="start"
                        style={[{ fill: 'orange' }]}
                    />
                }
            />

            <VictoryLegend
                x={15}
                y={170}
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={{
                    border: { stroke: 'orange', strokeWidth: 0 },
                    title: { fontSize: 16 },
                    labels: { fontSize: 16 },
                    data: { fillOpacity: 0.7 },
                }}
                colorScale={['#1f1f1f', 'orange']}
                data={[
                    { name: 'Overall Average', symbol: { type: 'square' } },
                    { name: 'My Sleep', symbol: { type: 'square' } },
                ]}
            />
            <VictoryAxis fixLabelOverlap={true} />
            <VictoryAxis dependentAxis fixLabelOverlap={true} label="Hours" />
        </VictoryChart>
    )
}

export default GraphSleep
