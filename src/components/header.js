import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Nav from './nav'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import { colors } from '../utils/styles'

const StyledHeader = styled.header`
    background: ${colors.background};
    margin-bottom: 10px;
    overflow: hidden;
    padding: 1rem;
    @media screen and (max-width: 480px) {
        padding-bottom: 0;
    }
`

const Container = styled.div`
    float: left;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // padding: 1rem;
    @media screen and (max-width: 480px) {
        float: none;
    }
`
const H1 = styled.h1`
    // flex: 1;
`

const Header = ({ siteTitle }) => {
    const logo = useStaticQuery(graphql`
        query logoImageQuery {
            logoImage: file(relativePath: { eq: "bear-state-logo-Sept2020-white.png" }) {
                childImageSharp {
                    fixed(width: 80, height: 80) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            mobileImage: file(relativePath: { eq: "bear-state-logo-Sept2020-white.png" }) {
                childImageSharp {
                    fixed(width: 40, height: 40) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `)

    return (
        <StyledHeader>
            <Container>
                <H1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        style={{
                            color: `white`,
                            textDecoration: `none`,
                            boxShadow: 0,
                        }}
                    >
                        <Img fixed={logo.logoImage.childImageSharp.fixed} alt="Bear State Gym" title="Logo" />{' '}
                        {siteTitle}
                    </Link>
                </H1>
            </Container>
            <Nav />
        </StyledHeader>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
