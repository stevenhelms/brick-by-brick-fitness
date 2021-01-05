import React from 'react'
import { navigate } from 'gatsby'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'gatsby-plugin-firebase'
import { useAppContext } from '../services/context'

// import { handleLogin, isLoggedIn } from '../services/auth-fake'
import { setUser, isLoggedIn } from '../services/auth-firebase'

const Login = () => {
    const { dispatch } = useAppContext()

    const getUiConfig = auth => {
        return {
            signInFlow: 'popup',
            signInOptions: [
                auth.EmailAuthProvider.PROVIDER_ID,
                // auth.GoogleAuthProvider.PROVIDER_ID,
                // auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: result => {
                    // console.log(result)
                    setUser(result.user)
                    dispatch({ type: 'SET_USER', value: result.user })
                    navigate('/app/')
                },
            },
        }
    }

    if (isLoggedIn()) {
        // console.log(getUser())
        navigate(`/app/`)
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Log In</h1>
            {/*<form
                method="post"
                onSubmit={event => {
                    handleSubmit(event)
                    navigate(`/app/`)
                }}
            >
                <label>
                    Username
                    <input type="text" name="username" onChange={handleUpdate} />
                </label>
                <label>
                    Password
                    <input type="password" name="password" onChange={handleUpdate} />
                </label>
                <input type="submit" value="Log In" />
            </form> */}
            <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />
        </>
    )
}

export default Login
