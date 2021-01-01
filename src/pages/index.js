import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to the Winter 2021 Nutrition Challenge.</p>
        <Link to="/app/dashboard/">Go to Dashboard</Link> <br />
    </Layout>
)

export default IndexPage
