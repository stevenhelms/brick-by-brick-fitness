import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import { useAppContext } from '../services/context'
import { emailToKey } from '../utils/firebase'
import { Button, H2 } from '../utils/styles'
import styled from '@emotion/styled'

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
`

const JournalRow = ({ data }) => {
    return (
        <ItemContainer>
            <ItemHeader>{data.journalDate}</ItemHeader>
            <ItemRow>
                <div>Protein: {data.protein || 0} servings</div>
                <div>Carbs: {data.carbs || 0} servings</div>
                <div>Veggies: {data.veggies || 0} servings</div>
            </ItemRow>
            <ItemRow>
                <div>Water: {data.water || 0} ounces</div>
                <div>Sleep: {data.sleep || 0} hours</div>
                <div>Eating Slowly: {data.eat_slowly || 0} times</div>
            </ItemRow>
            <ItemRow>
                <div>Workout: {data.workout ? 'Yes' : 'No'}</div>
            </ItemRow>
            <ItemRow>
                <div>Extras:</div>
                <div>Recovery: {data.recovery || 'n/a'}</div>
                <div>Stress: {data.stress || 'n/a'}</div>
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
            {isReady ? (
                <>
                    {journal.map((j, i) => (
                        <JournalRow data={j} key={i} />
                    ))}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default Journal
