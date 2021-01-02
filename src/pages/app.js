import React from 'react'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../services/auth-firebase'

import { AppProvider } from '../services/context'
import Layout from '../components/layout'
import Dashboard from '../components/dashboard'
import Journal from '../components/journal'
import Login from '../components/login'
import Profile from '../components/profile'
import CreateJournal from '../components/createjournal'
import TestData from '../components/testdata'

// import PrivateRoute from '../components/PrivateRoute'

const App = ({ location }) => {
    if (!isLoggedIn() && location.pathname !== `/app/login`) {
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
                    <Login path="login" />
                    <TestData path="testdata" />
                </Router>
            </Layout>
        </AppProvider>
    )
}

export default App