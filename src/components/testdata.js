import React, { useEffect, useState, createRef, useRef } from 'react'
import firebase from 'gatsby-plugin-firebase'
import { isBrowser } from '../utils/browser'
import GraphLine from './graphline'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory'

import {
    XYPlot,
    FlexibleXYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    LineSeriesCanvas,
    VerticalBarSeries,
    LabelSeries,
    Crosshair,
    DecorativeAxis,
} from 'react-vis'
import { sortByTotalPoints, sortByFirst } from '../services/sort'
import { useAppContext } from '../services/context'

const useResize = myRef => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWidth(myRef?.current ? myRef.current.offsetWidth : 0)
            setHeight(myRef?.current ? myRef.current.offsetHeight : 0)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])

    return { width, height }
}

const testUsers = [
    {
        first: 'Steven',
        last: 'Helms',
        email: 'steven.helms@gmail.com',
        journal: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        first: 'Ford',
        last: 'helms',
        email: 'ford@shelms.dev',
        journal: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
]

const testJournalEntries = [
    {
        veggies: 8,
        water: 60,
        carbs: 6,
        protein: 4,
        journalDate: '2020-12-31',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },

    {
        water: 80,
        veggies: 8,
        journalDate: '2021-01-01',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },

    {
        water: 72,
        veggies: 8,
        carbs: 5,
        protein: 4,
        journalDate: '',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
]

const VBar = ({ data = null }) => {
    if (data == null) {
        // Nothing passed in, gather it.
    }

    const macros = { protein: 0, carbs: 0, fats: 0 }
    const graphData = []
    data.forEach(d => {
        macros['protein'] += d?.totals?.protein ? d.totals.protein : 0
        macros['carbs'] += d?.totals?.carbs ? d.totals.carbs : 0
        macros['fats'] += d?.totals?.fats ? d.totals.fats : 0
    })
    console.log('VBar ----')
    console.log(macros)

    graphData.push({ macro: 'protein', portions: macros['protein'] })
    graphData.push({ macro: 'carbs', portions: macros['carbs'] })
    graphData.push({ macro: 'fats', portions: macros['fats'] })
    console.log(graphData)

    console.log('VBar ----')
    return (
        <VictoryChart height={200} domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar
                data={graphData}
                x="macro"
                y="portions"
                labels={({ datum }) => datum.portions}
                style={{ labels: { fill: 'white' } }}
                labelComponent={<VictoryLabel dy={30} />}
            />
        </VictoryChart>
    )
}

const LineChart2 = ({ data }) => {
    // Reformat our database data into something graphable
    const plotHeight = 300
    const palette = ['aqua', 'blue', 'navy']

    data.sort((a, b) => sortByFirst(a, b))
    console.log('linechart2 byname', data)

    data.sort((a, b) => sortByTotalPoints(a, b)).reverse()
    // data.sort((a, b) => b.y - a.y) // sort descending
    console.log('linechart2 by total points', data)

    const seriesData = data.map((d, idx) => {
        return {
            x: idx,
            first: d.first,
            y: d.totals?.carbs || 0,
        }
    })

    const top5 = seriesData.slice(0, 5) // sort descending

    // seriesData.sort((a, b) => sortByTotalPoints(a, b)) // Sort decending, top 5
    console.log('linechart2 top5', top5)
    return (
        <div style={{ border: '1px solid green', borderRadius: '3px' }}>
            <FlexibleXYPlot
                height={plotHeight}
                // yDomain={[1, 5]}
                // colorType="category"
                // colorDomain={[0, 1]}
                // colorRange={palette}
            >
                {/* <XAxis top={0} hideLine tickValues={[0, 1, 3, 4, 5, 6]} title="X" /> */}
                <YAxis />
                <VerticalBarSeries data={top5} />
                <LineSeries data={seriesData} curve={'curveMonotoneX'} />

                {/* <LabelSeries data={top5} getLabel={d => d.first} /> */}
                <LabelSeries data={top5} />
                {/* <XAxis top={midway} marginTop={0} hideTicks style={{ line: { stroke: 'orange' } }} /> */}
            </FlexibleXYPlot>
        </div>
    )
}

const TestData = () => {
    const { state } = useAppContext()
    const [data, setData] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    console.log('-=-=- TEST DATA -=-=-')
    const today = new Date().toISOString().substr(0, 10)

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
                setData(p)
                setIsReady(true)
            })
    }, [])

    return (
        <div>
            {isReady ? <GraphLine line1="sleep" line2="stress" /> : null}
            {isReady ? <GraphLine line1="total_points" line1labels={false} line2="stress" /> : null}
            {isReady ? <GraphLine line1="water" line2="recovery" /> : null}
            {isReady ? <GraphLine line1="water" line2="stress" /> : null}
            {isReady ? <VBar data={data} /> : null}
        </div>
    )
}

export default TestData
