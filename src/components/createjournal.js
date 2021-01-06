import React from 'react'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import { utcToLocal } from '../utils/datetime'
import { calculatePoints } from '../services/calc'
import config from '../../config'

import {
    BorderDiv,
    BodyText,
    FormGroup,
    FormLabel,
    FormSubText,
    italics,
    inputMargin,
    Button,
    Error,
    Div,
} from '../utils/styles'
import { emailToKey, getProfile } from '../utils/firebase'
import { useAppContext } from '../services/context'

// const handleSubmitNetlify = event => {
//     console.log(event.target)
//     event.preventDefault()
//     let formData = new FormData(event.target)
//     fetch('/app', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams(formData).toString(),
//     })
//         .then(() => navigate('/app/'))
//         .catch(error => alert(error))
// }

const JournalForm = () => {
    const { state, dispatch } = useAppContext()

    const handleSubmit = values => {
        const userId = emailToKey(state.user.email)

        // Let's keep our key date in our local timezone for readability and quick reuse
        const journalDate = values.journalDate || utcToLocal(new Date()).toISOString().substr(0, 10)

        values.total_points = calculatePoints(values, state.user)
        values.journalDate = journalDate
        values.updatedAt = new Date().toISOString()
        values.createdAt = new Date().toISOString()
        // console.log(values)

        firebase
            .database()
            .ref('users/' + userId + '/journal/' + journalDate)
            .set(values, error => {
                if (error) {
                    console.error(error)
                    toast.error('Whoops. Something went wrong. Please try again.')
                } else {
                    // console.log('handleSubmit - success')
                    // force refresh of local user object
                    getProfile(state.user.email).then(profile => {
                        dispatch({ type: 'SET_PROFILE', value: profile })
                        navigate('/app/')
                    })
                }
            })
    }

    return (
        <Formik
            initialValues={{
                carbs: 0,
                eat_slowly: 0,
                protein: 0,
                sleep: 0,
                veggies: 0,
                water: 0,
                workout: false,
            }}
            validationSchema={yup.object().shape({
                carbs: yup.number().required().integer(),
                eat_slowly: yup.number().required().integer(),
                protein: yup.number().required().integer(),
                recovery: yup.string().required(),
                sleep: yup.number().required().positive().integer(),
                stress: yup.string().required(),
                veggies: yup.number().required().integer(),
                water: yup.number().required().integer(),
                workout: yup.bool(),
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
                        id="journal"
                        netlify="true"
                        name="Journal Entry"
                        method="POST"
                        onSubmit={handleSubmit}
                        style={{ flex: 'auto' }}
                    >
                        <input type="hidden" name="form-name" value="Journal Entry" />
                        <FormGroup>
                            <FormLabel htmlFor="workout">Workout Today?</FormLabel>
                            <Field style={{ transform: 'scale(1.5,1.5)' }} type="checkbox" name="workout" />
                            <ErrorMessage component={Error} name="workout" />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="water">Water</FormLabel>
                            <Field name="water" type="number" />
                            <ErrorMessage component={Error} name="water" />
                            <FormSubText>Enter ounces of water consumed today.</FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="protein">Protein</FormLabel>
                            <Field name="protein" type="number" />
                            <ErrorMessage component={Error} name="protein" />
                            <FormSubText>Using the hand portions guide, enter portions eaten today.</FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="veggies">Veggies</FormLabel>
                            <Field type="number" name="veggies" />
                            <ErrorMessage component={Error} name="veggies" />
                            <FormSubText>Using the hand portions guide, enter portions eaten today.</FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="carbs">Carbs</FormLabel>
                            <Field type="number" name="carbs" />
                            <ErrorMessage component={Error} name="carbs" />
                            <FormSubText>Using the hand portions guide, enter portions eaten today.</FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="sleep">Hours Sleep</FormLabel>
                            <Field type="number" name="sleep" />
                            <ErrorMessage component={Error} name="sleep" />
                            <FormSubText>
                                Sleep is critical to full recovery from the previous day. Your body does it's repair
                                work while you sleep.
                            </FormSubText>
                        </FormGroup>
                        <FormGroup name="eat_slowly" type="number">
                            <FormLabel htmlFor="eat_slowly">Ate Slowly</FormLabel>
                            <Field type="number" name="eat_slowly" />
                            <ErrorMessage component={Error} name="eat_slowly" />
                            <FormSubText>
                                By eating slowly you will feel full faster and as a result you will eat less food.
                            </FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <div id="recovery-group">Physical Recovery</div>
                            <div role="group" aria-labelledby="recovery-group">
                                {Object.keys(config.recoveryScale).map(key => {
                                    return (
                                        <FormLabel key={key}>
                                            <Field css={inputMargin} type="radio" name="recovery" value={key} />
                                            {config.recoveryScale[key]}
                                        </FormLabel>
                                    )
                                })}
                            </div>
                            <ErrorMessage component={Error} name="recovery" />
                            <FormSubText>
                                How did you feel your recovery was this morning? Recovering from the previous day's
                                activities is important.
                            </FormSubText>
                        </FormGroup>
                        <FormGroup>
                            <div id="stress-group">Stress Level</div>
                            <div role="group" aria-labelledby="stress-group">
                                {Object.keys(config.stressScale).map(key => {
                                    return (
                                        <FormLabel key={key}>
                                            <Field css={inputMargin} type="radio" name="stress" value={key} />
                                            {config.stressScale[key]}
                                        </FormLabel>
                                    )
                                })}
                            </div>
                            <ErrorMessage component={Error} name="stress" />
                            <FormSubText>
                                How stressed are you feeling today? Stress can inhibit weight loss and reduce your
                                overall health.
                            </FormSubText>
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

const CreateJournal = () => (
    <Div>
        <BodyText css={italics} style={{ padding: '0 10px' }}>
            Each day you should submit a log of your progress. Only submitted data will count towards the challenge.
        </BodyText>
        <BorderDiv>
            <JournalForm />
        </BorderDiv>
    </Div>
)

export default CreateJournal
