/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import Header from './header'
import Footer from './footer'
// import "./layout.css"

const Body = styled.div`
    margin: 3rem auto 0 auto;
    max-width: 960px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #1f1f1f;
`

const Layout = ({ children, fullMenu }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} fullMenu={fullMenu} />
            <Body>
                <main>{children}</main>
            </Body>
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
