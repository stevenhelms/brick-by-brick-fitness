import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import { colors } from '../utils/styles'

const goalcss = css`
    flex: 1;
    white-space: nowrap;
    display: inline-flex;
    padding: 10px;
    @media screen and (max-width: 480px) {
        display: block;
        padding-left: 30px;
    }
`

const MyContainer = styled.div`
    flex: 1;
    border: 1px solid ${colors.lightGray};
    border-radius: 3px;
    @media screen and (max-width: 480px) {
        margin-left: 0px;
        margin-top: 30px;
    }
`

const GoalLabel = styled.div`
    color: ${colors.typographyGrayed};
    font-weight: 700;
    flex: 1;
`
const GoalItem = styled.div`
    flex: 2;
`

const Goals = ({ user, profile, ...rest }) => {
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
        <MyContainer>
            <div style={{ display: 'flex' }}>
                <div css={goalcss}>
                    <GoalLabel>Protein:</GoalLabel>
                    <GoalItem>
                        {localProfile.goal_protein || 'X'} palms ({localProfile.goal_protein_grams || 'X'}g)
                    </GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Veggies:</GoalLabel>
                    <GoalItem>{localProfile.goal_veggies || 'X'} fists</GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Carbs:</GoalLabel>
                    <GoalItem>
                        {localProfile.goal_carbs || 'X'} hands ({localProfile.goal_carbs_grams || 'X'}g)
                    </GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Fats:</GoalLabel>
                    <GoalItem>
                        {localProfile.goal_fats || 'X'} thumbs ({localProfile.goal_fats_grams || 'X'}g)
                    </GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Water:</GoalLabel>
                    <GoalItem>{localProfile.weight / 2 || '0'} oz.</GoalItem>
                </div>
                <div css={goalcss}>
                    <GoalLabel>Calories:</GoalLabel>
                    <GoalItem>{localProfile.goal_calories || 'X'}</GoalItem>
                </div>
            </div>
        </MyContainer>
    )
}

export default Goals
