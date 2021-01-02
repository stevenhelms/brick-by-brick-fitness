import React, { useEffect, useState } from 'react'
import firebase from 'gatsby-plugin-firebase'
import { emailToKey } from '../utils/firebase'
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
        // console.log(localProfile)
        // if (!localProfile) {
        const userId = emailToKey(user.email)
        firebase
            .database()
            .ref('/users/' + userId)
            .get()
            .then(snapshot => {
                setLocalProfile(snapshot.val())
                dispatch({ type: 'SET_PROFILE', value: snapshot.val() })
                setIsReady(true)
            })
        // }
    }, [user.email, dispatch])

    return (
        <>
            <H2>Profile</H2>
            {isReady ? <>{localProfile.first}</> : <p>Loading...</p>}
        </>
    )
}

export default Profile
