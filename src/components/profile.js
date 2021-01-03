import React, { useEffect, useState } from 'react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

import { H2 } from '../utils/styles'

const Profile = ({ user, profile }) => {
    const { state, dispatch } = useAppContext()
    const [isReady, setIsReady] = useState(false)
    const [localProfile, setLocalProfile] = useState(profile)

    if (!user) {
        user = state.user
    }

    useEffect(() => {
        getProfile(user.email).then(profile => {
            setLocalProfile(profile)
            dispatch({ type: 'SET_PROFILE', value: profile })
            setIsReady(true)
        })
    }, [user.email, dispatch])

    return (
        <>
            <H2>Profile</H2>
            {isReady ? <>{localProfile.first}</> : <p>Loading...</p>}
        </>
    )
}

export default Profile
