import React from 'react'
import {
    VictoryAxis,
    VictoryLine,
    VictoryChart,
    VictoryLabel,
    VictoryLegend,
    VictoryGroup,
    VictoryScatter,
    VictoryTheme,
} from 'victory'
import { useAppContext } from '../services/context'
import { toTitleCase } from '../utils/strings'

/**
 * This function take a complete user object and complete
 * set of journal entries and will create a single line
 * graph based on the type specified. Type must be the
 * same as a field in the journal entries. A second and
 * optional line can be created if specified
 *
 * @param {string} line1
 * @param {string} line2
 */
const GraphLine = ({
    line1,
    line2 = undefined,
    line1labels = true,
    line2labels = true,
    title = undefined,
    isReady = false,
}) => {
    const { state } = useAppContext()
    const { profile } = state
    const weekday = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    const calculateY = (profile, date, line1) => {
        let y = 0
        if (line1 === 'food') {
            // Make an attempt to gather adherence, not points
            const protein = profile?.journal[date]['protein'] / profile.goal_protein
            const veggies = profile?.journal[date]['veggies'] / profile.goal_veggies
            const carbs = profile?.journal[date]['carbs'] / profile.goal_carbs
            const fats = profile?.journal[date]['fats'] / profile.goal_fats
            const compliance = Math.round(((protein + veggies + carbs + fats) / 4) * 100)
            y = compliance
        } else if (profile.journal[date][line1]) {
            y = profile.journal[date][line1]
        }

        return y
    }

    if (!isReady) {
        return null
    }

    console.log('GraphLine:', line1, line2)

    const plot = []
    let minX = new Date()
    let maxX = new Date(2000, 1, 1)
    let maxY1 = -1
    let maxY2 = -1
    Object.keys(profile.journal).forEach((date, idx) => {
        const jDate = date.split('-')
        const dt = new Date(jDate[0], jDate[1] - 1, jDate[2])
        const graphDate = dt.toLocaleString('default', { month: 'short' }) + '-' + ('0' + jDate[2]).slice(-2)
        const dow = weekday[dt.getDay()]
        const y = calculateY(profile, date, line1)
        // const y = profile.journal[date][line1] ? profile.journal[date][line1] : 0
        const y2 =
            typeof line2 !== 'undefined' && profile.journal[date][line2] ? Number(profile.journal[date][line2]) : 0

        maxX = dt > maxX ? graphDate : maxX
        minX = dt < minX ? graphDate : minX
        maxY1 = y > maxY1 ? y : maxY1
        // minY = Number(profile.journal[date][line1]) < minY ? Number(profile.journal[date][line1]) : minY
        if (typeof line2 !== 'undefined') {
            maxY2 = Number(profile.journal[date][line2]) > maxY2 ? Number(profile.journal[date][line2]) : maxY2
        }

        plot.push({ i: idx, x: idx, y1: y, y2: y2, date: graphDate, dow: dow })
    })

    // console.log('GraphLine plot', plot)
    // console.log('GraphLine maxY1', maxY1)
    // console.log('GraphLine maxY2', maxY2)
    const xTickValues = []
    for (let i = 0; i < plot.length; i += 2) {
        xTickValues.push(i)
    }

    return (
        <VictoryChart
            animate={false}
            data-testid={`line-chart-${line1}-${line2}`}
            height={200}
            domainPadding={{ x: 0, y: 10 }}
            domain={{ y: [0, 1] }}
            // minDomain={{ y: 0 }}
            // style={{
            // parent: {
            //     border: '1px solid #ccc',
            // },
            // background: {
            //     fill: '#eee',
            // },
            // }}
            theme={VictoryTheme.material}
        >
            {typeof title !== 'undefined' ? <VictoryLabel x={50} y={30} text={title} style={styles.title} /> : null}
            <VictoryAxis
                // fixLabelOverlap={true}
                // scale={{ x: 'time' }}
                style={styles.axisZero}
                tickValues={xTickValues}
                tickLabelComponent={<VictoryLabel text={({ datum }) => plot[datum]?.dow || datum} />}
            />
            <VictoryAxis
                dependentAxis
                orientation="left"
                tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                tickFormat={t => (t * maxY1).toFixed(1)}
                style={styles.axisOne}
            />
            {typeof line2 !== 'undefined' ? (
                <VictoryAxis
                    dependentAxis
                    orientation="right"
                    maxDomain={maxY2}
                    tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                    tickFormat={t => (t * maxY2).toFixed(1)}
                    style={styles.axisTwo}
                />
            ) : null}
            {typeof line2 !== 'undefined' ? (
                <VictoryGroup
                    data={plot}
                    x="x"
                    domain={{
                        x: [0, plot.length],
                        y: [0, maxY2],
                    }}
                    y={d => d.y2 / maxY2}
                >
                    <VictoryLine
                        data-testid="line2"
                        interpolation={'natural'}
                        // labels={({ datum }) => (line2labels ? datum.y2.toFixed(0) : '')}
                        style={styles.lineTwo}
                        labelComponent={<VictoryLabel dy={12} />}
                    />
                    <VictoryScatter style={styles.seriesTwo} size={2} symbol="square" />
                </VictoryGroup>
            ) : null}
            <VictoryGroup
                data={plot}
                domain={{
                    x: [0, plot.length],
                    y: [0, maxY1],
                }}
                y={d => d.y1 / maxY1}
            >
                <VictoryLine
                    data-testid="line1"
                    interpolation={'natural'}
                    // labels={({ datum }) => (line1labels ? datum.y1.toFixed(0) : '')}
                    style={styles.lineOne}
                />
                <VictoryScatter style={styles.seriesOne} size={2} />
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
                    { name: toTitleCase(line1), symbol: { type: 'circle' }, labels: { fill: colorScale[0] } },
                    { name: toTitleCase(line2), symbol: { type: 'square' }, labels: { fill: colorScale[1] } },
                ]}
            />
        </VictoryChart>
    )
}

export default GraphLine

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
        labels: baseLabelStyles,
    },
    lineOne: {
        data: { stroke: colorScale[0], strokeWidth: 1, opacity: 0.7 },
        labels: { ...baseLabelStyles, fill: colorScale[0] },
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

export const methods = {
    plotXYData: (journal, type, barChart = false) => {
        const plot = []

        Object.keys(journal).forEach((date, idx) => {
            const jDate = date.split('-')
            const dt = new Date(jDate[0], jDate[1] - 1, jDate[2])
            const graphDate = dt.toLocaleString('default', { month: 'short' }) + '-' + ('0' + jDate[2]).slice(-2)

            const y = journal[date][type] ? journal[date][type] : 0
            const index = barChart ? idx : graphDate
            plot.push({ x: index, y: y })
        })

        return plot
    },
}
