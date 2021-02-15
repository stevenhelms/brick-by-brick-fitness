import React, { useEffect, useState } from 'react'
import firebase from 'gatsby-plugin-firebase'

import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryTheme } from 'victory'
import { graphStyles } from '../utils/styles'

const GraphMacros = ({ title = undefined }) => {
    const [data, setData] = useState(undefined)
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
                setData(p)
                setIsReady(true)
            })
    }, [])

    if (!isReady) {
        return null
    }

    const graphData = {
        overall: [
            { macro: 'protein', portions: 0 },
            { macro: 'carbs', portions: 0 },
            { macro: 'fats', portions: 0 },
            { macro: 'veggies', portions: 0 },
        ],

        male: [
            { macro: 'protein', portions: 0 },
            { macro: 'carbs', portions: 0 },
            { macro: 'fats', portions: 0 },
            { macro: 'veggies', portions: 0 },
        ],

        female: [
            { macro: 'protein', portions: 0 },
            { macro: 'carbs', portions: 0 },
            { macro: 'fats', portions: 0 },
            { macro: 'veggies', portions: 0 },
        ],
    }

    data.forEach(user => {
        graphData['overall'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
        graphData['overall'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
        graphData['overall'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0
        graphData['overall'][3]['portions'] += user?.totals?.veggies ? user.totals.veggies : 0

        if (user.gender === 'male') {
            graphData['male'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
            graphData['male'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
            graphData['male'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0
            graphData['male'][3]['portions'] += user?.totals?.veggies ? user.totals.veggies : 0
        }

        if (user.gender === 'female') {
            graphData['female'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
            graphData['female'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
            graphData['female'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0
            graphData['female'][3]['portions'] += user?.totals?.veggies ? user.totals.veggies : 0
        }
    })

    return (
        <VictoryChart height={200} domainPadding={{ x: 40, y: 0 }} theme={VictoryTheme.material}>
            {typeof title !== 'undefined' ? (
                <VictoryLabel x={50} y={30} text={title} style={graphStyles.title} />
            ) : null}
            <VictoryGroup offset={18} colorScale={graphStyles.colorScale} style={graphStyles.bar}>
                {/* <VictoryAxis /> */}
                {/* <VictoryAxis dependentAxis /> */}
                <VictoryBar
                    data={graphData['overall']}
                    x="macro"
                    y="portions"
                    barWidth={16}
                    labels={({ datum }) => datum.portions}
                    labelComponent={<VictoryLabel dy={30} />}
                />
                <VictoryBar
                    data={graphData['male']}
                    x="macro"
                    y="portions"
                    barWidth={16}
                    labels={({ datum }) => datum.portions}
                    labelComponent={<VictoryLabel dy={30} />}
                />
                <VictoryBar
                    data={graphData['female']}
                    x="macro"
                    y="portions"
                    barWidth={16}
                    labels={({ datum }) => datum.portions}
                    labelComponent={<VictoryLabel dy={30} />}
                />
            </VictoryGroup>
            <VictoryLegend
                x={40}
                y={170}
                centerTitle
                orientation="horizontal"
                // gutter={30}
                style={graphStyles.legend}
                colorScale={graphStyles.colorScale}
                data={[
                    { name: 'Overall', symbol: { type: 'square' } },
                    { name: 'Men', symbol: { type: 'square' } },
                    { name: 'Women', symbol: { type: 'square' } },
                ]}
            />
        </VictoryChart>
    )
}

export default GraphMacros
