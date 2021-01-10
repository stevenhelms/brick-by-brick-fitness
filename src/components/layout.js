/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'

import { useAppContext } from '../services/context'
import { isBrowser } from '../utils/browser'
import { colors } from '../utils/styles'
import Header from './header'
import Footer from './footer'
import { getUser } from '../services/auth-firebase'

const bodycss = css`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    color: ${colors.typography};
`
const maincss = css`
    flex: 1;
    width: 80%;
    margin: 3rem auto 0 auto;
    align-items: center;
`

const Layout = ({ children, fullMenu }) => {
    const { state, dispatch } = useAppContext()

    if (isBrowser() && !state?.user) {
        dispatch({ type: 'SET_USER', value: getUser() })
    }

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
        <div css={bodycss}>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} fullMenu={fullMenu} />
            <main css={maincss}>{children}</main>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
