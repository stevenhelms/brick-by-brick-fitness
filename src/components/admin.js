import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'

import { useAppContext } from '../services/context'
import { isAdmin } from '../utils/auth'
import { H2, Heading, colors } from '../utils/styles'

const DownloadParticipants = ({ list }) => {
    // set up local state for generating the download link
    const [downloadLink, setDownloadLink] = useState('')
    console.log('DownloadParticipants', list)
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
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h2>Download a list of participants</h2>
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
        </div>
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
            <DownloadParticipants list={users} />
        </div>
    )
}

export default Admin
