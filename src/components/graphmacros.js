import React, { useEffect, useState } from 'react'
import firebase from 'gatsby-plugin-firebase'

import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory'

const GraphMacros = () => {
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
        ],

        male: [
            { macro: 'protein', portions: 0 },
            { macro: 'carbs', portions: 0 },
            { macro: 'fats', portions: 0 },
        ],

        female: [
            { macro: 'protein', portions: 0 },
            { macro: 'carbs', portions: 0 },
            { macro: 'fats', portions: 0 },
        ],
    }

    data.forEach(user => {
        graphData['overall'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
        graphData['overall'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
        graphData['overall'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0

        if (user.gender === 'male') {
            graphData['male'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
            graphData['male'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
            graphData['male'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0
        }

        if (user.gender === 'female') {
            graphData['female'][0]['portions'] += user?.totals?.protein ? user.totals.protein : 0
            graphData['female'][1]['portions'] += user?.totals?.carbs ? user.totals.carbs : 0
            graphData['female'][2]['portions'] += user?.totals?.fats ? user.totals.fats : 0
        }
    })

    return (
        <VictoryChart height={200} domainPadding={{ x: 60, y: 0 }}>
            <VictoryGroup
                offset={24}
                colorScale={['#1f1f1f', 'orange', 'tomato']}
                style={{
                    data: { fillOpacity: 0.7 },
                    labels: { fontSize: 16 },
                }}
            >
                {/* <VictoryAxis /> */}
                {/* <VictoryAxis dependentAxis /> */}
                <VictoryBar data={graphData['overall']} x="macro" y="portions" labels={({ datum }) => datum.portions} />
                <VictoryBar data={graphData['male']} x="macro" y="portions" labels={({ datum }) => datum.portions} />
                <VictoryBar data={graphData['female']} x="macro" y="portions" labels={({ datum }) => datum.portions} />
            </VictoryGroup>
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
                colorScale={['#1f1f1f', 'orange', 'tomato']}
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
