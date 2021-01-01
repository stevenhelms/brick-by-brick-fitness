import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Container = styled.div``

const Home = () => (
    <Container>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        {/*<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>*/}
        <Link to="/app/dashboard/">Go to Dashboard</Link> <br />
    </Container>
)

export default Home
