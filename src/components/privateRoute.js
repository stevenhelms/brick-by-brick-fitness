import React from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../services/auth-fake'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isLoggedIn() && location.pathname.match(/^\/app/)) {
        navigate('/')
        return null
    }

    return <Component {...rest} />
}

export default PrivateRoute
