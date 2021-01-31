import React, { useEffect, useState, createRef, useRef } from 'react'
import firebase from 'gatsby-plugin-firebase'

import { emailToKey } from '../utils/firebase'
import '../../node_modules/react-vis/dist/style.css'
import { getInnerDimensions, DEFAULT_MARGINS } from 'react-vis/dist/utils/chart-utils'

import { useRect, isBrowser } from '../utils/browser'
import GraphMacros from './graphmacros'

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

const AdyptaGoals = () => {
    console.log('-=-=- Adypta Goals -=-=-')
    // const componentRef = useRef(null)
    // console.log('dimensions', props.dimensions)
    // const { width, height } = useResize(props.ref)
    // console.log('width', width)
    // console.log('height', height)
    // console.log('componentref', props.ref)

    const plotHeight = 300
    const goal = 2.9
    const adyptationGoals = {
        goal: goal,
        data: [
            // This represents a 7 day series of average goal data.
            {
                x: 0,
                y: 3.12,
            },
            {
                x: 1,
                y: '3.21',
                color: 1,
            },
            {
                x: 2,
                y: '3.03',
                color: 2,
            },
            {
                x: 3,
                y: '2.88',
                color: 0,
            },
            {
                x: 4,
                y: '2.85',
                color: 0,
            },
            {
                x: 5,
                y: '2.93',
                color: 'green',
            },
            {
                x: 6,
                y: '2.87',
                color: 3,
            },
        ],
    }

    const labelData = adyptationGoals.data.map((d, idx) => ({
        x: d.x,
        y: Math.max(adyptationGoals.data[idx].y),
    }))

    const seriesData = adyptationGoals.data.map(item => ({
        x: item.x,
        y: item.y,
        color: item.y <= adyptationGoals.goal ? 1 : 2,
    }))

    if (isBrowser()) {
        console.log(window)
        console.log('iHeight', window.innerHeight)
        console.log('iWidth', window.innerWidth)
    }

    const palette = ['aqua', 'blue', 'navy']
    // const innerDimensions = getInnerDimensions(
    //     { width: window.innerWidth, height: window.innerHeight },
    //     DEFAULT_MARGINS
    // )
    console.log(DEFAULT_MARGINS)
    const midway = (adyptationGoals.goal / 5) * (plotHeight - DEFAULT_MARGINS.top * 3 - DEFAULT_MARGINS.bottom)
    console.log('midway', midway)

    return (
        <div style={{ border: '1px solid orange', borderRadius: '3px' }}>
            <FlexibleXYPlot
                height={plotHeight}
                yDomain={[1, 5]}
                colorType="category"
                colorDomain={[0, 1]}
                colorRange={palette}
            >
                {/* <XAxis top={0} hideLine tickValues={[0, 1, 3, 4, 5, 6]} title="X" /> */}
                <YAxis />
                <VerticalBarSeries data={seriesData} />

                {/* <LabelSeries data={labelData} getLabel={d => d.x} /> */}

                {/* <XAxis top={midway} marginTop={0} hideTicks style={{ line: { stroke: 'orange' } }} /> */}
            </FlexibleXYPlot>
        </div>
    )
}

const TestData = () => {
    const [data, setData] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    console.log('-=-=- TEST DATA -=-=-')
    const today = new Date().toISOString().substr(0, 10)

    if (0) {
        testUsers.forEach(user => {
            const userId = emailToKey(user.email)
            firebase
                .database()
                .ref('users/' + userId)
                .set(user)

            // Create a new post reference with an auto-generated id
            // var postListRef = firebase.database().ref('users/' + userId + '/journal')

            testJournalEntries.forEach(journal => {
                var journalKey = journal.journalDate || today
                journal.journalDate = journalKey
                // var newPostRef = postListRef.push()
                firebase
                    .database()
                    .ref('users/' + userId + '/journal/' + journalKey)
                    .set(journal)
            })
            // const newJournalKey = firebase
            //     .database()
            //     .ref('users/' + userId)
            //     .child('journal')
            //     .push().key
            // console.log(`new journal key ${newJournalKey}`)
            // https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields

            const emailRef = firebase.database().ref('users/' + userId + '/email')
            emailRef.on('value', snapshot => {
                console.log(snapshot.val())
            })
        })
    }

    /* useEffect(() => {
        // const { width, height } = useResize(appRef)
        // console.log('width', width)
        // console.log('height', height)
        console.log('appref', targetRef)
        console.log('dimensions', dimensions)
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight,
            })
        }
    }, []) */

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
            <h1>Test Data Loader</h1>
            <p style={{ color: 'orange' }}>Test Data is being loaded...</p>
            {isReady ? <GraphMacros data={data} /> : null}
            {isReady ? <VBar data={data} /> : null}

            {isReady ? <LineChart2 data={data} /> : null}
            <AdyptaGoals />
            {/* <LineChart /> */}
        </div>
    )
}

export default TestData
