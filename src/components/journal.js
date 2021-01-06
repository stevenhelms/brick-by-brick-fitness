import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { useAppContext } from '../services/context'
import { emailToKey } from '../utils/firebase'
import { Button, H2 } from '../utils/styles'
import styled from '@emotion/styled'
import config from '../../config'

const ItemContainer = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid #aeaeae;
`
const ItemHeader = styled.div`
    font-weight: 700;
`
const ItemRow = styled.div`
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eeeeee;
    @media screen and (max-width: 480px) {
        // display: inline-block;
        padding-left: 10px;
        flex-direction: column;
    }
`
const ItemGroup = styled.div`
    flex: 1;
    display: flex;
`
const ItemLabel = styled.div`
    flex: 1;
`
const ItemValue = styled.div`
    flex: 2;
`
const JournalRow = ({ data }) => {
    return (
        <ItemContainer>
            <ItemHeader>{data.journalDate}</ItemHeader>
            <ItemRow>
                <ItemGroup>
                    <ItemLabel>Protein:</ItemLabel>
                    <ItemValue>{data.protein || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Carbs:</ItemLabel>
                    <ItemValue>{data.carbs || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Veggies:</ItemLabel>
                    <ItemValue>{data.veggies || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Fats:</ItemLabel>
                    <ItemValue>{data.fats || 0}</ItemValue>
                </ItemGroup>
            </ItemRow>
            <ItemRow>
                <ItemGroup>
                    <ItemLabel>Water:</ItemLabel>
                    <ItemValue>{data.water || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Sleep:</ItemLabel>
                    <ItemValue>{data.sleep || 0}</ItemValue>
                </ItemGroup>
                <ItemGroup>
                    <ItemLabel>Eating Slowly:</ItemLabel>
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
            </ItemRow>
        </ItemContainer>
    )
}

const Journal = ({ user, location }) => {
    const { state } = useAppContext()
    const [journal, setJournal] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [fullPage, setFullPage] = useState(false)

    const getJournal = user => {
        const userId = emailToKey(user.email)

        firebase
            .database()
            .ref('/users/' + userId + '/journal')
            .get()
            .then(snapshot => {
                const items = []
                snapshot.forEach(item => {
                    // console.log('+++ adding journal item +++')
                    // console.log(item.val())
                    items.push(item.val())
                })
                // console.log('--- setJournal ---')
                // console.log(items)
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
            <H2>Journal</H2>

            {fullPage ? (
                <p>
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
