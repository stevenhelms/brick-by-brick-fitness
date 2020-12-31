/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import Header from "./header"
// import "./layout.css"

const Body = styled.div`
  margin: 3rem auto;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1f1f1f;
`
const footer = css`
  margin-top: 2rem;
`

const Layout = ({ children }) => {
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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Body>
        <main>{children}</main>
        <footer css={footer}>
          © {new Date().getFullYear()}{" "}
          <a href="https://www.bearstategym.com">Bear State Gym</a>
        </footer>
      </Body>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
