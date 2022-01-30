import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { useAppContext } from '../services/context'
import { emailToKey } from '../utils/firebase'
import {
    Button,
    H2,
    Heading,
    ItemContainer,
    ItemGroup,
    ItemHeader,
    ItemRow,
    ItemLabel,
    ItemValue,
    colors,
} from '../utils/styles'
import config from '../../config'

const JournalRow = ({ data }) => {
    return (
        <ItemContainer>
            <ItemHeader>{data.journalDate}</ItemHeader>
            <ItemRow>
                <ItemGroup>
                    <ItemLabel>Protein:</ItemLabel>
                    <ItemValue>
                        {data.protein || 0}
                        {data?.protein_grams ? ' (' + data.protein_grams + 'g)' : null}
                    </ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Carbs:</ItemLabel>
                    <ItemValue>
                        {data.carbs || 0}
                        {data?.carbs_grams ? ' (' + data.carbs_grams + 'g)' : null}
                    </ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Veggies:</ItemLabel>
                    <ItemValue>{data.veggies || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Fats:</ItemLabel>
                    <ItemValue>
                        {data.fats || 0}
                        {data?.fats_grams ? ' (' + data.fats_grams + 'g)' : null}
                    </ItemValue>
                </ItemGroup>
            </ItemRow>
            <ItemRow>
                <ItemGroup>
                    <ItemLabel>Water:</ItemLabel>
                    <ItemValue>{data.water || 0} oz</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Sleep:</ItemLabel>
                    <ItemValue>{data.sleep || 0} hrs</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Eat Slowly:</ItemLabel>
                    <ItemValue>{data.eat_slowly || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Workout:</ItemLabel>
                    <ItemValue>{data.workout ? 'Yes' : 'No'}</ItemValue>
                </ItemGroup>
            </ItemRow>
            <ItemRow>
                <ItemGroup>
                    <ItemLabel>Recovery:</ItemLabel>
                    <ItemValue>{config.recoveryScale[data.recovery] || 'n/a'}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Stress:</ItemLabel>
                    <ItemValue>{config.stressScale[data.stress] || 'n/a'}</ItemValue>
                </ItemGroup>
                <ItemGroup></ItemGroup>
                <ItemGroup></ItemGroup>
            </ItemRow>
        </ItemContainer>
    )
}

const Journal = ({ user, location, limit = 50 }) => {
    const { state } = useAppContext()
    const [journal, setJournal] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [fullPage, setFullPage] = useState(false)

    const getJournal = user => {
        const userId = emailToKey(user.email)

        firebase
            .database()
            .ref('/users/' + userId + '/journal')
            .orderByKey()
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    items.push(item.val())
                })
                items.sort((a, b) => b - a) // Sort decending by date
                // console.log('getJournal', 'limiting records to', limit)
                items.splice(limit) // limit the records
                setJournal(items)
                setIsReady(true)
            })
    }

    if (!user) {
        user = state.user
    }

    useEffect(() => {
        if (state.profile?.journal) {
            const items = []
            Object.values(state.profile.journal).forEach(entry => {
                items.push(entry)
            })
            items.sort((a, b) => b - a) // Sort decending by date
            // console.log('useEffect', 'limiting records to', limit)
            items.splice(limit) // limit the records
            setJournal(items)
            setIsReady(true)
        } else {
            getJournal(user)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (location && location.pathname !== `/app/profile`) {
            setFullPage(true)
        }
    }, [location])

    return (
        <>
            <Heading>
                <H2>
                    Journal{' '}
                    {limit < 10 ? (
                        <div style={{ color: colors.typographyGrayed, fontSize: 'smaller', display: 'inline' }}>
                            (most recent)
                        </div>
                    ) : null}
                </H2>
            </Heading>

            {fullPage ? (
                <p style={{ paddingTop: '10px' }}>
                    <Link to="/app/create">
                        <Button>Create Journal</Button>
                    </Link>
                </p>
            ) : null}
            {!isReady ? (
                <p>Loading...</p>
            ) : journal.length > 0 ? (
                <>
                    {journal.map((j, i) => (
                        <JournalRow data={j} key={i} />
                    ))}
                </>
            ) : (
                <p>No journal entries yet.</p>
            )}
        </>
    )
}

export default Journal
