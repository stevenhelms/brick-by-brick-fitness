import React, { useEffect, useState } from 'react'
import { Button, Div, colors, FlexRow, FlexItem, H1, H4, Container } from '../utils/styles'

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
                if (person?.totals && person.totals.sleep) {
                    stats['hours_slept'] += Number(person.totals.sleep)
                }
                if (person?.totals && person.totals.water) {
                    stats['water_consumed'] += Number(person.totals.water)
                }
                if (typeof person.totals !== 'undefined' && Object.keys(person.journal).length > 21) {
                    stats['app_participants'] += 1
                }
            }

            console.log(stats)
            setSummary(stats)
        })
    }, [data, isReady])

    if (!isReady || typeof data === 'undefined' || Object.keys(summary).length === 0) {
        return <Container>Loading Challenge Summary...</Container>
    }

    return (
        <Container>
            <FlexRow>
                <FlexItem>
                    <H4>Participant Info</H4>
                    <p>
                        Total: {summary['total_participants']}
                        <br />
                        App Users: {summary['app_participants']}
                    </p>
                </FlexItem>
                <FlexItem>Total Pounds Lost: {summary['weight_loss'].toFixed(1)}</FlexItem>
                <FlexItem>
                    Total Muscle Gained: {summary['muscle_gained'].toFixed(1)} {summary['muscle_lost'].toFixed(1)}
                </FlexItem>
                <FlexItem>Total Hours Slept: {summary['hours_slept'].toFixed(1)}</FlexItem>
                <FlexItem>Total Water Consumed: {summary['water_consumed'].toFixed(0)} ounces.</FlexItem>{' '}
            </FlexRow>
            <FlexRow>
                <FlexItem>
                    As with anything, results are only as good as the data. Despite incomplete data, the results are
                    impressive and indicate the willingness and ability to work towards a specific goal. Additionally,
                    the underlying success is result of having a clear plan of action to reach the goal.
                </FlexItem>
            </FlexRow>
        </Container>
    )
}

export default ChallengeSummary
