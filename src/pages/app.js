import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import Dashboard from '../components/dashboard'
import Login from '../components/login'
import Home from '../components/home'
import PrivateRoute from '../components/PrivateRoute'
import SEO from '../components/seo'

const App = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <Router basepath="/">
                <PrivateRoute path="/app/dashboard" component={Dashboard} />
                <Login path="/app/login" />
                <Home path="/" />
            </Router>
        </Layout>
    )
}

export default App
