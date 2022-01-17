import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'gatsby-plugin-firebase'
import {
    VictoryArea,
    VictoryAxis,
    VictoryGroup,
    VictoryLine,
    VictoryChart,
    VictoryLabel,
    VictoryLegend,
    VictoryScatter,
    VictoryTheme,
} from 'victory'
import { useAppContext } from '../services/context'
import { sortByDate } from '../services/sort'
import { graphStyles } from '../utils/styles'

const GraphSleep = ({ title = undefined }) => {
    const { state } = useAppContext()
    const { profile } = state
    const [graphData, setGraphData] = useState(undefined)
    const [myData, setMyData] = useState(undefined)
    const [isReady, setIsReady] = useState(false)
    const weekday = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    const calculateSleep = useCallback(
        users => {
            let dataset = { overall: {}, personal: {} }

            users.forEach(user => {
                if (typeof user.journal === 'undefined') {
                    return
                }

                Object.keys(user.journal).forEach(item => {
                    const journalDate = user.journal[item].journalDate
                    const dt = new Date(journalDate)
                    const dow = weekday[dt.getDay()]

                    if (typeof dataset.overall[journalDate] === 'undefined') {
                        dataset.overall[journalDate] = { total: 0, count: 0, average: 0, dow: '' }
                        dataset.personal[journalDate] = { total: 0 }
                    }

                    if (user?.journal[journalDate]) {
                        dataset.overall[journalDate]['total'] += user.journal[item]?.sleep
                            ? user.journal[item].sleep
                            : 0
                        dataset.overall[journalDate]['count']++
                        dataset.overall[journalDate]['dow'] = dow
                    }

                    if (profile?.email === user.email) {
                        // graph our own data also.
                        dataset.personal[journalDate]['total'] = user.journal[item]?.sleep
                            ? user.journal[item].sleep
                            : 0
                    }
                })
            })

            const gData = []
            const pData = []
            Object.keys(dataset.overall).forEach((key, idx) => {
                const avg = Number(dataset.overall[key]['total']) / Number(dataset.overall[key]['count'])
                gData.push({ idx: idx, date: key, average: avg, dow: dataset.overall[key]['dow'] })
                pData.push({ idx: idx, date: key, total: dataset.personal[key]['total'] })
            })

            pData.sort((a, b) => sortByDate(a, b))
            gData.sort((a, b) => sortByDate(a, b))

            // console.log('group data', gData)
            setGraphData(gData)
            // console.log('personal data', pData)
            setMyData(pData)
        },
        [profile] // eslint-disable-line react-hooks/exhaustive-deps
    )

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const p = []
                snapshot.forEach(item => {
                    p.push(item.val())
                })
                calculateSleep(p)
                setIsReady(true)
            })
    }, [calculateSleep, state.profile])

    if (!isReady) {
        return null
    }

    const xTickValues = []
    for (let i = 0; i < graphData.length; i += 2) {
        xTickValues.push(i)
    }
    let maxY1 = -1
    Object.keys(myData).forEach((date, idx) => {
        maxY1 = myData[idx].total > maxY1 ? myData[idx].total : maxY1
    })

    if (!xTickValues.length) {
        return null
    }

    return (
        <VictoryChart
            animate={false}
            data-testid="sleep-chart"
            height={200}
            domainPadding={{ x: 0, y: 10 }}
            theme={VictoryTheme.material}
        >
            {typeof title !== 'undefined' ? (
                <VictoryLabel x={50} y={30} text={title} style={graphStyles.title} />
            ) : null}
            <VictoryAxis
                tickValues={xTickValues}
                tickLabelComponent={<VictoryLabel text={({ datum }) => graphData[datum].dow || datum} />}
            />
            <VictoryAxis dependentAxis fixLabelOverlap={true} />

            <VictoryGroup
                data={myData}
                x="date"
                y="total"
                domain={{
                    x: [0, myData.length],
                    y: [0, maxY1],
                }}
                // y={d => d.total / maxY1}
            >
                <VictoryArea style={graphStyles.areaOne} interpolation={'natural'} />
                <VictoryLine
                    style={graphStyles.lineOne}
                    interpolation={'natural'}
                    // labels={({ datum }) => datum.total.toFixed(1)}
                    labelComponent={
                        <VictoryLabel
                            text={({ datum }) => datum.total}
                            dy={20}
                            // dx={-40}
                            // angle={-45}
                            textAnchor="start"
                            verticalAnchor="start"
                        />
                    }
                />
                <VictoryScatter style={graphStyles.seriesOne} size={2} symbol="circle" />
            </VictoryGroup>

            <VictoryGroup
                data={graphData}
                x="date"
                y="average"
                domain={{
                    x: [0, graphData.length],
                    y: [0, maxY1],
                }}
            >
                <VictoryLine interpolation={'natural'} style={graphStyles.lineTwo} />
                <VictoryScatter style={graphStyles.seriesTwo} size={2} symbol="square" />
            </VictoryGroup>

            <VictoryLegend
                x={40}
                y={170}
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={graphStyles.legend}
                colorScale={graphStyles.colorScale}
                data={[
                    { name: 'My Sleep', labels: { fill: graphStyles.colorScale[0] } },
                    {
                        name: 'Overall Average',
                        symbol: { type: 'square' },
                        labels: { fill: graphStyles.colorScale[1] },
                    },
                ]}
            />
        </VictoryChart>
    )
}

export default GraphSleep
