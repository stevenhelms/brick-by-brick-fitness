import React from 'react'
import { Link, navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { isLoggedIn, logout } from '../services/auth-firebase'
import { isBrowser } from '../utils/browser'
import { useAppContext } from '../services/context'
import { isAdmin } from '../utils/auth'

const StyledNav = styled.nav`
    // display: flex;
    // flex: 1;
    // justify-content: flex-end;
    // align-items: baseline;
    color: #ffffff;
    float: right;
    @media screen and (max-width: 480px) {
        float: none;
        margin-top: 20px;
    }
`
const Ul = styled.ul`
    list-style: none;
    @media screen and (max-width: 480px) {
        margin-left: 0;
    }
`
const Li = styled.li`
    display: inline;
    margin-right: 30px;
    @media screen and (max-width: 480px) {
        // display: block;
        text-align: left;
        float: none;
        margin-right: 10px;
    }
`
const whiteA = css`
    color: #ffffff;
`
// const Anchor = styled.a`
//   color: #ffffff;
// `

export default function Nav() {
    const { state } = useAppContext()

    // const greetingMessage = isLoggedIn()
    //   ? `Hello ${getUser().name}`
    //   : "You are not logged in."
    const routes = (
        <>
            <Li>
                <Link css={whiteA} to="/app/">
                    Dashboard
                </Link>
            </Li>
            <Li>
                <Link css={whiteA} to="/app/journal">
                    Journal
                </Link>
            </Li>
        </>
    )

    const adminRoutes = isAdmin(state.profile?.role) ? (
        <Li>
            <Link css={whiteA} to="/app/admin">
                Admin
            </Link>
        </Li>
    ) : null

    return (
        <>
            {/* <span>{greetingMessage}</span> */}
            <StyledNav id="nav">
                <Ul>
                    <Li>
                        <Link css={whiteA} to="/">
                            Home
                        </Link>
                    </Li>
                    {routes}
                    {adminRoutes}
                    {isLoggedIn() ? (
                        <Li>
                            <Link
                                css={whiteA}
                                to="/"
                                onClick={event => {
                                    event.preventDefault()
                                    logout(firebase).then(() => {
                                        isBrowser() && window.localStorage.clear()
                                        navigate(`/`)
                                    })
                                }}
                            >
                                Logout
                            </Link>
                        </Li>
                    ) : (
                        <Li>
                            <Link css={whiteA} to="/app/login">
                                Login
                            </Link>
                        </Li>
                    )}
                </Ul>
            </StyledNav>
        </>
    )
}
