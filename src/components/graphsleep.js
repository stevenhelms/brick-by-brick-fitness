import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'gatsby-plugin-firebase'
import {
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
                    // const jDate = journalDate.split('-')
                    // const dt = new Date(jDate[0], jDate[1] - 1, jDate[2])
                    const dt = new Date(journalDate)
                    // const graphDate =
                    //     dt.toLocaleString('default', { month: 'short' }) + '-' + ('0' + jDate[2]).slice(-2)
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

                    if (profile.email === user.email) {
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
                // console.log(dataset.overall[key])
                const avg = Number(dataset.overall[key]['total']) / Number(dataset.overall[key]['count'])
                gData.push({ idx: idx, date: key, average: avg, dow: dataset.overall[key]['dow'] })
                pData.push({ idx: idx, date: key, total: dataset.personal[key]['total'] })
            })

            pData.sort((a, b) => sortByDate(a, b))
            gData.sort((a, b) => sortByDate(a, b))

            console.log('group data', gData)
            setGraphData(gData)
            console.log('personal data', pData)
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
    // console.log('graphsleep maxY1', maxY1)
    // console.log('myData', myData)

    return (
        <VictoryChart
            animate={false}
            data-testid="sleep-chart"
            height={200}
            domainPadding={{ x: 0, y: 10 }}
            theme={VictoryTheme.material}
        >
            {typeof title !== 'undefined' ? <VictoryLabel x={50} y={30} text={title} style={styles.title} /> : null}
            <VictoryAxis
                tickValues={xTickValues}
                tickLabelComponent={<VictoryLabel text={({ datum }) => graphData[datum].dow || datum} />}
            />
            <VictoryAxis dependentAxis fixLabelOverlap={true} />

            <VictoryGroup
                data={graphData}
                x="date"
                y="average"
                domain={{
                    x: [0, graphData.length],
                    y: [0, maxY1],
                }}
            >
                <VictoryLine interpolation={'natural'} style={styles.lineTwo} />
                <VictoryScatter style={styles.seriesTwo} size={2} symbol="square" />
            </VictoryGroup>

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
                <VictoryLine
                    style={styles.lineOne}
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
                <VictoryScatter style={styles.seriesOne} size={2} symbol="circle" />
            </VictoryGroup>

            <VictoryLegend
                x={40}
                y={170}
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={{
                    border: { stroke: colorScale[0], strokeWidth: 0 },
                    title: { ...baseLabelStyles, fontSize: 14 },
                    labels: { ...baseLabelStyles, fontSize: 14 },
                    data: { fillOpacity: 1 },
                }}
                colorScale={colorScale}
                data={[
                    { name: 'My Sleep', labels: { fill: colorScale[0] } },
                    { name: 'Overall Average', symbol: { type: 'square' }, labels: { fill: colorScale[1] } },
                ]}
            />
        </VictoryChart>
    )
}

export default GraphSleep

const colorScale = ['#e25a2d', '#787276']
// e25a2d, alt orange #ed7014

const baseLabelStyles = {
    fontFamily: "'Helvetica Neue', 'Helvetica', sans-serif",
    fontSize: 10,
    letterSpacing: 'normal',
    padding: 8,
    fill: 'grey',
    stroke: 'transparent',
    strokeWidth: 0,
}

export const styles = {
    title: {
        fill: colorScale[0],
        fontSize: 22,
    },
    axisZero: {
        axis: { stroke: '#8d4004', strokeWidth: 1 },
        ticks: { stroke: '#8d4004', strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: '#8d4004' },
    },
    seriesOne: {
        data: { stroke: colorScale[0], fillOpacity: 1, fill: colorScale[0], strokeWidth: 0 },
        labels: { ...baseLabelStyles, fontSize: 10 },
    },
    lineOne: {
        data: { stroke: colorScale[0], strokeWidth: 1, opacity: 0.7 },
        labels: { ...baseLabelStyles, fill: colorScale[0], fontSize: 10 },
    },
    axisOne: {
        axis: { stroke: colorScale[0], strokeWidth: 1 },
        ticks: { stroke: colorScale[0], strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: colorScale[0] },
    },
    seriesTwo: {
        data: { stroke: colorScale[1], fillOpacity: 1, fill: colorScale[1], strokeWidth: 0 },
        labels: { ...baseLabelStyles, fill: colorScale[1] },
    },
    lineTwo: {
        data: { stroke: colorScale[1], strokeWidth: 1, opacity: 0.7 },
        labels: { ...baseLabelStyles, fill: colorScale[1] },
    },
    axisTwo: {
        ticks: { stroke: colorScale[1], strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: colorScale[1] },
    },
}
