import React, { useEffect, useState } from 'react'
import { colors, H4, Container } from '../utils/styles'

const ChallengeSummary = ({ data, isReady }) => {
    const [summary, setSummary] = useState({})

    useEffect(() => {
        if (!isReady || typeof data === 'undefined') {
            return
        }

        const stats = {
            weight_loss: 0,
            muscle_gained: 0,
            muscle_lost: 0,
            pbf_lost: 0,
            hours_slept: 0,
            water_consumed: 0,
            app_participants: 0,
            goal_wl: 0,
            goal_not_wl: 0,
            total_participants: data.length,
        }

        data.forEach(person => {
            // Classify people into two camps. Weight Loss or Other
            if (person.goal_challenge === 'Lose Weight') {
                stats['goal_wl'] += 1
            } else {
                stats['goal_not_wl'] += 1
            }

            // Weight Loss
            if (person.weight_end !== 'undefined' && person.weight - (person.weight_end || person.weight) > 0) {
                stats['weight_loss'] += Number(person.weight - person.weight_end)
            }

            if (person.smm_start && person.smm_end) {
                if (
                    person.goal_challenge !== 'Lose Weight' ||
                    (person.goal_challenge === 'Lose Weight' && person.smm_end - person.smm_start > 0)
                ) {
                    // There is a tendency to lose muscle when cutting weight, but sometimes
                    // people can still gain. We take the goal of 'Lose Weight' into account
                    // to produce a better number. It's a distortion of the actual number but
                    // mentally better.
                    stats['muscle_gained'] += Number(person.smm_end - person.smm_start)
                } else {
                    stats['muscle_lost'] += Number(person.smm_end - person.smm_start)
                }
            }

            if (person?.pbf_end && person.pbf_start - person.pbf_end > 0) {
                stats['pbf_lost'] += person.pbf_start - person.pbf_end
            }

            if (person?.totals && person.totals.sleep) {
                stats['hours_slept'] += Number(person.totals.sleep)
            }
            if (person?.totals && person.totals.water) {
                stats['water_consumed'] += Number(person.totals.water)
            }
            if (typeof person.totals !== 'undefined' && Object.keys(person.journal).length >= 18) {
                stats['app_participants'] += 1
            }

            // console.log(stats)
            setSummary(stats)
        })
    }, [data, isReady])

    if (!isReady || typeof data === 'undefined' || Object.keys(summary).length === 0) {
        return <Container>Loading Challenge Summary...</Container>
    }

    return (
        <>
            <H4>Challenge Statistics</H4>
            <div>
                <div>
                    <p>
                        Total: {summary['total_participants']}
                        <br />
                        Active App Users: {summary['app_participants']}
                    </p>
                </div>
                <div>Total Pounds Lost: {summary['weight_loss'].toFixed(1)} lbs.</div>
                <div>Total Muscle Gained: {summary['muscle_gained'].toFixed(1)} lbs.</div>
                <div>Total % Body Fat Lost: {summary['pbf_lost'].toFixed(1)}%</div>
                <div>*Total Hours Slept: {summary['hours_slept'].toFixed(1)}</div>
                <div>*Total Water Consumed: {summary['water_consumed'].toFixed(0)} ounces.</div>
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ fontSize: 'smaller', color: colors.typographyGrayed }}>
                    * Incomplete data. As with anything, results are only as good as the data. Despite incomplete data,
                    the results are impressive and indicate the willingness and ability to work towards a specific goal.
                    Additionally, the underlying success is result of having a clear plan of action to reach the goal.
                </div>
            </div>
        </>
    )
}

export default ChallengeSummary
