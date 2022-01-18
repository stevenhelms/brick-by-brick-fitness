import React from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { isLoggedIn, isBrowser } from '../services/auth-firebase'

import { AppProvider } from '../services/context'
import Layout from '../components/layout'
import Dashboard from '../components/dashboard'
import Journal from '../components/journal'
import Login from '../components/login'
import Profile from '../components/profile'
import CreateJournal from '../components/createjournal'
import TestData from '../components/testdata'
import Registration from '../components/registration'
import Admin from '../components/admin'

const App = ({ location }) => {
    console.log('node_env', process.env.NODE_ENV)

    if (!isLoggedIn() && isBrowser() && location.pathname !== `/app/login`) {
        navigate('/app/login', { replace: true })
        return null
    }

    return (
        <AppProvider>
            <Layout>
                <Router basepath="/app">
                    <Dashboard path="/" />
                    <Journal path="journal" />
                    <CreateJournal path="create" />
                    <Profile path="profile" />
                    <Registration path="registration" />
                    <Login path="login" />
                    <TestData path="testdata" />
                    <Admin path="admin" />
                </Router>
            </Layout>
        </AppProvider>
    )
}

export default App
