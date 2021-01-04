import React, { useEffect, useState } from 'react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import { H3, Li, Ul } from '../utils/styles'

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
            <Ul style={{ display: 'block' }}>
                <Li style={{ whiteSpace: 'nowrap' }}>Protein Servings: {localProfile.goal_protein || 'unset'}</Li>
                <Li style={{ whiteSpace: 'nowrap' }}>Veggie Servings: {localProfile.goal_veggies || 'unset'}</Li>
                <Li style={{ whiteSpace: 'nowrap' }}>Carbs Servings: {localProfile.goal_carbs || 'unset'}</Li>
                <Li style={{ whiteSpace: 'nowrap' }}>Water Goal: {localProfile.weight / 2 || 'unset'} oz.</Li>
            </Ul>
        </div>
    )
}

export default Goals
