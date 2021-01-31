import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

import { useAppContext } from '../services/context'
import { isAdmin } from '../utils/auth'
import { calculatePoints } from '../services/calc'
import {
    H2,
    Heading,
    colors,
    BorderDiv,
    FormGroup,
    FormLabel,
    Button,
    Error,
    FlexRow,
    Container,
} from '../utils/styles'
import { toTitleCase } from '../utils/strings'
import { sortByTotalPoints } from '../services/sort'

const AdminLeaderBoard = () => {
    const [users, setUsers] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    // console.log(item.val())
                    items.push(item.val())
                })
                items.sort((a, b) => sortByTotalPoints(a, b)) // Sort decending
                // setLeaders(items.slice(0, 5)) // Only the Top 5
                setUsers(items)
                setIsReady(true)
            })
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <BorderDiv>
            <H2>Admin Leader Board</H2>
            <p>The complete list of participants. Useful for finding those struggling and needing encouragement.</p>
            <Container style={{ flexDirection: 'column', padding: '0 20px' }}>
                {isReady ? (
                    users.map((leader, i) => {
                        // if (!leader.totals) {
                        //     // No journal entries yet which builds totals
                        //     return null
                        // }
                        const journal = leader?.journal ? leader.journal : {}
                        console.log(Object.keys(journal).length)
                        return (
                            <FlexRow
                                mobileColumn
                                key={i}
                                style={{ flexWrap: 'wrap', borderBottom: '1px solid ' + colors.veryLightGray }}
                            >
                                <div style={{ flex: 1 }}>{i + 1}.</div>
                                <div style={{ flex: 4 }}>{leader.first}</div>
                                <div style={{ flex: 2 }}>{leader?.totals?.points || 0}</div>
                                <div style={{ flex: '4 0 0%' }}>{Object.keys(journal).length} entries</div>
                                <div style={{ flex: '6 0 0%' }}>{leader.email}</div>
                            </FlexRow>
                        )
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </BorderDiv>
    )
}
const PointCalculator = () => {
    const [points, setPoints] = useState(0)
    const [users, setUsers] = useState(undefined)
    const [isReady, setIsReady] = useState(false)

    const handleSubmit = values => {
        const user_profile = users[values.user_id]
        setPoints(calculatePoints(values, user_profile))
        console.log(user_profile)
        console.log(values)
    }

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                // const items = []
                // snapshot.forEach(item => {
                //     // console.log(item.val())
                //     items.push(item.val())
                // })
                // items.sort((a, b) => sortByTotalPoints(a, b)) // Sort decending
                // setLeaders(items.slice(0, 5)) // Only the Top 5
                setUsers(snapshot.val())
                setIsReady(true)
            })
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <BorderDiv>
            <H2>Calculate Points for a Participants Day</H2>
            <p>This can be used if there was a problem and the points need to be recalculated.</p>
            <Formik
                initialValues={{
                    carbs: 0,
                    eat_slowly: 0,
                    fats: 0,
                    protein: 0,
                    sleep: 0,
                    veggies: 0,
                    water: 0,
                    workout: false,
                }}
                validationSchema={yup.object().shape({
                    carbs: yup.number().required().integer(),
                    eat_slowly: yup.number().required().integer(),
                    fats: yup.number().required().integer(),
                    protein: yup.number().required().integer(),
                    sleep: yup.number().required().integer(),
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
                                <FormLabel htmlFor="user_id">Select Participant:</FormLabel>
                                <Field as="select" name="user_id">
                                    {Object.keys(users).map(index => {
                                        return <option value={index}>{toTitleCase(users[index].email)}</option>
                                    })}
                                </Field>
                            </FormGroup>

                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="water">Water</FormLabel>
                                <Field name="water" type="number" />
                                <ErrorMessage component={Error} name="water" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="protein">Protein</FormLabel>
                                <Field name="protein" type="number" />
                                <ErrorMessage component={Error} name="protein" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="veggies">Veggies</FormLabel>
                                <Field type="number" name="veggies" />
                                <ErrorMessage component={Error} name="veggies" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="carbs">Carbs</FormLabel>
                                <Field type="number" name="carbs" />
                                <ErrorMessage component={Error} name="carbs" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="fats">Fats</FormLabel>
                                <Field type="number" name="fats" />
                                <ErrorMessage component={Error} name="fats" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="sleep">Hours Sleep</FormLabel>
                                <Field type="number" name="sleep" />
                                <ErrorMessage component={Error} name="sleep" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="eat_slowly">Ate Slowly</FormLabel>
                                <Field type="number" name="eat_slowly" />
                                <ErrorMessage component={Error} name="eat_slowly" />
                            </FormGroup>
                            <FormGroup style={{ float: 'left' }}>
                                <FormLabel htmlFor="workout">Workout Today?</FormLabel>
                                <Field style={{ transform: 'scale(1.5,1.5)' }} type="checkbox" name="workout" />
                                <ErrorMessage component={Error} name="workout" />
                            </FormGroup>
                            <FormGroup style={{ textAlign: 'center', clear: 'both' }}>
                                <Button type="submit" disabled={false}>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </>
                )}
            </Formik>
            <div style={{ display: 'block' }}>
                Calculated Points: <strong>{points}</strong>
            </div>
        </BorderDiv>
    )
}

const ParticipantInfo = ({ list }) => {
    // set up local state for generating the download link
    const [downloadLink, setDownloadLink] = useState('')
    console.log('ParticipantInfo', list)
    // function for generating file and set download link
    const makeTextFile = () => {
        // This creates the file.
        // In my case, I have an array, and each item in
        // the array should be on a new line, which is why
        // I use .join('\n') here.
        const data = new Blob([list.join('\n')], { type: 'text/csv' })
        // Blob

        // this part avoids memory leaks
        if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

        // update the download link state
        setDownloadLink(window.URL.createObjectURL(data))
    }

    // Call the function if list changes
    useEffect(() => {
        makeTextFile()
    }, [list]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BorderDiv>
            <div style={{ marginBottom: '30px' }}>
                <h2>Participant Information</h2>
                <a
                    style={{ color: colors.typography, margin: '5px' }}
                    // this attribute sets the filename
                    download="participants.csv"
                    // link to the download URL
                    href={downloadLink}
                >
                    Download Participant List (csv)
                </a>
            </div>
            <div>
                <h2>Email Addresses</h2>
                <div style={{ marginBottom: '20px' }}>
                    Copy the entire list below, and paste it into the an email to contact everyone in the challenge.
                </div>
                <div style={{ borderTop: `1px solid ${colors.lightGray}` }}>
                    {list.map(item => (
                        <span>{item[2]}; </span>
                    ))}
                </div>
            </div>
        </BorderDiv>
    )
}

const Admin = () => {
    const { state } = useAppContext()
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase
            .database()
            .ref('/users')
            .get()
            .then(snapshot => {
                const p = []
                snapshot.forEach(item => {
                    // console.log(item.val())
                    p.push(item.val())
                })

                let users = []
                p.forEach((user, idx) => {
                    users.push([user.first, user.last, user.email])
                })
                setUsers(users)
            })
    }, [])

    if (!isAdmin(state.profile?.role)) {
        navigate('/app', { replace: true })
        return null
    }

    return (
        <div>
            <Heading>
                <H2>Admin</H2>
            </Heading>
            <AdminLeaderBoard list={users} />
            <ParticipantInfo list={users} />
            <PointCalculator list={users} />
        </div>
    )
}

export default Admin
