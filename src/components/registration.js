import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { navigate } from 'gatsby'

import { useAppContext } from '../services/context'
import { emailToKey, getProfile } from '../utils/firebase'

import { BorderDiv, BodyText, FormGroup, FormLabel, italics, Button, Error, H1, colors } from '../utils/styles'
import { feetToInches } from '../services/calc'
import { toTitleCase } from '../utils/strings'
import config from '../../config'

const RegistrationForm = () => {
    const { state, dispatch } = useAppContext()

    const handleSubmit = values => {
        const inches = feetToInches(values.height_feet, values.height_inches)

        values.height = inches
        delete values.height_feet
        delete values.height_inches

        // Default values the user cannot specify.
        values.email = state.user.email
        values.role = ['participant']
        values.updatedAt = new Date().toISOString()
        values.createdAt = new Date().toISOString()
        console.log(values)

        const userId = emailToKey(state.user.email)
        firebase
            .database()
            .ref('users/' + userId)
            .set(values, error => {
                if (error) {
                    console.error(error)
                    toast.error('Whoops. Something went wrong. Please try again.')
                } else {
                    // console.log('handleSubmit - success')
                    // force refresh of local user object
                    getProfile(state.user.email).then(profile => {
                        dispatch({ type: 'SET_PROFILE', value: profile })
                        // navigate('/app/')
                    })
                }
            })
    }

    return (
        <Formik
            initialValues={{
                age: 0,
                height_feet: 0,
                height_inches: 0,
                goal_weight: 0,
                gender: 'male',
                level_method: 0,
                goal_challenge: 'Lose Weight',
            }}
            validationSchema={yup.object().shape({
                age: yup.number().required().positive().min(10).max(99).integer(),
                height_feet: yup.number().required().min(3).max(7).integer(),
                height_inches: yup.number().required().min(0).max(11).integer(),
                goal_weight: yup.number().required().integer(),
                gender: yup.string().required(),
                first: yup.string().required(),
                last: yup.string().required(),
            })}
            onSubmit={values => {
                setTimeout(() => {
                    handleSubmit(values)
                }, 400)
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <>
                    <Form
                        id="createprofile"
                        name="Create Profile"
                        method="POST"
                        onSubmit={handleSubmit}
                        style={{ flex: 'auto' }}
                    >
                        <FormGroup>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Field name="email" type="text" value={state.user.email} disabled={true} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="first">First Name</FormLabel>
                            <Field name="first" type="text" />
                            <ErrorMessage component={Error} name="first" />
                        </FormGroup>
                        <FormGroup borderBottom>
                            <FormLabel htmlFor="last">Last Name</FormLabel>
                            <Field name="last" type="text" />
                            <ErrorMessage component={Error} name="last" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="age">Age</FormLabel>
                            <Field name="age" type="number" />
                            <ErrorMessage component={Error} name="age" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <Field as="select" name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unspecified">Unspecified</option>
                            </Field>{' '}
                            <ErrorMessage component={Error} name="gender" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="height_feet">Height</FormLabel>
                            <Field name="height_feet" type="number" /> ft. <Field name="height_inches" type="number" />{' '}
                            inches.
                            <ErrorMessage component={Error} name="height_feet" />
                            <ErrorMessage component={Error} name="height_inches" />
                        </FormGroup>
                        <FormGroup borderBottom>
                            <FormLabel htmlFor="goal_weight">Goal Weight</FormLabel>
                            <Field name="goal_weight" type="number" />
                            <ErrorMessage component={Error} name="goal_weight" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="level_method">Overall Level Method Level</FormLabel>
                            <Field as="select" name="level_method">
                                {Object.keys(config.levelMethod).map(index => {
                                    return <option value={index}>{toTitleCase(config.levelMethod[index])}</option>
                                })}
                            </Field>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="goal_challenge">What is your Goal?</FormLabel>
                            <Field as="select" name="goal_challenge">
                                {Object.keys(config.challengeGoal).map(index => {
                                    return (
                                        <option value={config.challengeGoal[index].short}>
                                            {toTitleCase(config.challengeGoal[index].short)}
                                        </option>
                                    )
                                })}
                            </Field>
                            {Object.keys(config.challengeGoal).map(index => {
                                return (
                                    <div style={{ fontSize: 'smaller', color: colors.typographyGrayed }}>
                                        <strong>{config.challengeGoal[index].short}</strong> -{' '}
                                        {config.challengeGoal[index].long}
                                    </div>
                                )
                            })}
                        </FormGroup>
                        <FormGroup style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={false}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                </>
            )}
        </Formik>
    )
}

const Registration = () => {
    const { state } = useAppContext()

    if (state.profile) {
        // console.log('Profile exists... redirecting')
        navigate('/app/')
    }

    return (
        <BorderDiv>
            <H1>Registration</H1>
            <BodyText>In order to create a challenge customized for you, we need some additional information.</BodyText>
            <RegistrationForm />
            <BodyText css={italics}>
                * Your information will not be shared. Only you and select Bear State Gym nutrition staff can view it.
            </BodyText>
        </BorderDiv>
    )
}

export default Registration
