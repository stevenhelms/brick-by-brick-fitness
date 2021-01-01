import React from 'react'
import { navigate } from 'gatsby'
// import { handleLogin, isLoggedIn } from '../services/auth-fake'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'gatsby-plugin-firebase'

import { setUser, isLoggedIn, getUser } from '../services/auth-firebase'

const Login = () => {
    // const [auth, setAuth] = useState({ username: '', password: '' })

    // const handleUpdate = event => {
    //     console.log(event.target)
    //     setAuth({
    //         ...auth,
    //         [event.target.name]: event.target.value,
    //     })
    // }

    // const handleSubmit = event => {
    //     event.preventDefault()
    //     console.log(auth)
    //     handleLogin(auth)
    // }

    const getUiConfig = auth => {
        return {
            signInFlow: 'popup',
            signInOptions: [
                auth.EmailAuthProvider.PROVIDER_ID,
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            // signInSuccessUrl: '/app/profile',
            callbacks: {
                signInSuccessWithAuthResult: result => {
                    console.log(result)
                    setUser(result.user)
                    navigate('/app/dashboard')
                },
            },
        }
    }

    if (isLoggedIn()) {
        console.log(getUser())
        navigate(`/app/dashboard`)
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Log In</h1>
            {/*<form
                method="post"
                onSubmit={event => {
                    handleSubmit(event)
                    navigate(`/app/dashboard`)
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
