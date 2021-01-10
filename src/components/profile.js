import React, { useEffect, useState } from 'react'
import { getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'
import { navigate } from 'gatsby'

import { H2, ItemContainer, ItemRow, ItemLabel, ItemValue } from '../utils/styles'
import config from '../../config'
import { toTitleCase } from '../utils/strings'

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
                <ItemContainer>
                    <ItemRow extraSpace>
                        <ItemLabel>Email:</ItemLabel>
                        <ItemValue>{localProfile.email}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>Name:</ItemLabel>
                        <ItemValue>
                            {localProfile.first} {localProfile.last}
                        </ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>Age:</ItemLabel>
                        <ItemValue>{localProfile.age}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>Gender:</ItemLabel>
                        <ItemValue>{localProfile.gender}</ItemValue>
                    </ItemRow>

                    <hr />
                    <ItemRow extraSpace>
                        <ItemLabel>Starting Weight:</ItemLabel>
                        <ItemValue>{localProfile.weight}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>Goal Weight:</ItemLabel>
                        <ItemValue>{localProfile.goal_weight}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>End Weight:</ItemLabel>
                        <ItemValue>{localProfile.weight_end}</ItemValue>
                    </ItemRow>

                    <hr />
                    <ItemRow extraSpace>
                        <ItemLabel>Starting Percent Body Fat:</ItemLabel>
                        <ItemValue>{localProfile.pbf_start}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>End Percent Body Fat:</ItemLabel>
                        <ItemValue>{localProfile.pbf_end}</ItemValue>
                    </ItemRow>

                    <hr />
                    <ItemRow extraSpace>
                        <ItemLabel>Overall Level Method Level:</ItemLabel>
                        <ItemValue>{toTitleCase(config.levelMethod[localProfile.level_method || 0])}</ItemValue>
                    </ItemRow>
                    <ItemRow extraSpace>
                        <ItemLabel>Challenge Goal:</ItemLabel>
                        <ItemValue>{localProfile.goal_challenge || ''}</ItemValue>
                    </ItemRow>
                </ItemContainer>
            ) : null}
        </>
    )
}

export default Profile
