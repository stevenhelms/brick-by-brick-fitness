import React from 'react'
import { Link, navigate } from 'gatsby'
import { isLoggedIn, logout } from '../services/auth-fake'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const StyledNav = styled.nav`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    // align-items: baseline;
    color: #ffffff;
`
const Ul = styled.ul`
    list-style: none;
`
const Li = styled.li`
    display: inline;
    margin-right: 30px;
`
const whiteA = css`
    color: #ffffff;
`
// const Anchor = styled.a`
//   color: #ffffff;
// `

export default function Nav() {
    // const greetingMessage = isLoggedIn()
    //   ? `Hello ${getUser().name}`
    //   : "You are not logged in."

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
                    {isLoggedIn() ? (
                        <>
                            <Li>
                                <Link css={whiteA} to="/app/dashboard">
                                    Dashboard
                                </Link>
                            </Li>
                            <Li>
                                <Link
                                    css={whiteA}
                                    to="/"
                                    onClick={event => {
                                        event.preventDefault()
                                        logout(() => navigate(`/app/login`))
                                    }}
                                >
                                    Logout
                                </Link>
                                <div data-netlify-identity-button>Logout w/ Netlify</div>
                            </Li>
                        </>
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
