import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import { H3 } from '../utils/styles'

const goalcss = css`
    flex: 1;
    white-space: nowrap;
    display: inline-flex;
    @media screen and (max-width: 480px) {
        display: block;
        padding-left: 30px;
    }
`

const GoalLabel = styled.div`
    flex: 1;
`
const GoalItem = styled.div`
    flex: 2;
`

const Goals = ({ user, profile }) => {
    const { state, dispatch } = useAppContext()
    const [isReady, setIsReady] = useState(false)
    const [localProfile, setLocalProfile] = useState(profile)

    if (!user) {
        user = state.user
    }

    useEffect(() => {
        getProfile(user.email).then(profile => {
            if (!profile) {
                // console.log('no profile')
                return null
            } else {
                setLocalProfile(profile)
                dispatch({ type: 'SET_PROFILE', value: profile })
                setIsReady(true)
            }
        })
    }, [user.email, dispatch])

    if (!isReady) {
        return null
    }

    return (
        <div style={{ marginBottom: '20px' }}>
            <H3>Daily Goals</H3>
            <div style={{ display: 'flex' }}>
                <div css={goalcss}>
                    <GoalLabel>Protein:</GoalLabel>
                    <GoalItem>{localProfile.goal_protein || 'X'} servings</GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Veggies:</GoalLabel>
                    <GoalItem>{localProfile.goal_veggies || 'X'} servings</GoalItem>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div css={goalcss}>
                    <GoalLabel>Carbs:</GoalLabel>
                    <GoalItem>{localProfile.goal_carbs || 'X'} servings</GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Fats:</GoalLabel>
                    <GoalItem>{localProfile.goal_fats || 'X'} servings</GoalItem>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '12px' }}>
                <div css={goalcss}>
                    <GoalLabel>Water:</GoalLabel>
                    <GoalItem>{localProfile.weight / 2 || '0'} oz.</GoalItem>
                </div>
                <div css={goalcss}>&nbsp;</div>
            </div>
        </div>
    )
}

export default Goals
