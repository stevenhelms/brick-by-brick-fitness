import React, { useEffect, useState } from 'react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import { H2, H3 } from '../utils/styles'
import { navigate } from 'gatsby'

const Profile = ({ user, profile }) => {
    const { state, dispatch } = useAppContext()
    const [isReady, setIsReady] = useState(false)
    const [localProfile, setLocalProfile] = useState(profile)

    if (!user) {
        user = state.user
    }

    useEffect(() => {
        getProfile(user.email).then(profile => {
            if (!profile) {
                console.log('no profile')
                navigate('/app/registration')
                return null
            } else {
                setLocalProfile(profile)
                dispatch({ type: 'SET_PROFILE', value: profile })
                setIsReady(true)
            }
        })
    }, [user.email, dispatch])

    return (
        <>
            <H2>Profile</H2>
            {isReady ? (
                <>
                    <div>Email: {localProfile.email}</div>
                    <div>
                        Name: {localProfile.first} {localProfile.last}
                    </div>
                    <div>Age: {localProfile.age}</div>
                    <div>Gender: {localProfile.gender}</div>
                    <hr />
                    <div>Starting Weight: {localProfile.weight || 'unset'}</div>
                    <div>Goal Weight: {localProfile.goal_weight}</div>
                    <hr />
                    <div>Starting Percent Body Fat: {localProfile.pbf_start || 'unset'}</div>
                    <div>End Percent Body Fat: {localProfile.pbf_end || 'unset'}</div>
                    {/* <hr />
                    <H3>Daily Goals</H3>
                    <div>Daily Protein Servings: {localProfile.goal_protein || 'unset'}</div>
                    <div>Daily Veggie Servings: {localProfile.goal_veggies || 'unset'}</div>
                    <div>Daily Carbs Servings: {localProfile.goal_carbs || 'unset'}</div>
                    <div>Daily Water Goal: {localProfile.weight / 2 || 'unset'}</div> */}
                </>
            ) : null}
        </>
    )
}

export default Profile
