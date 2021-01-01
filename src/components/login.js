import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn } from '../services/auth-fake'

const Login = () => {
    const [auth, setAuth] = useState({ username: '', password: '' })

    const handleUpdate = event => {
        console.log(event.target)
        setAuth({
            ...auth,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log(auth)
        handleLogin(auth)
    }

    if (isLoggedIn()) {
        navigate(`/app/dashboard`)
    }

    return (
        <>
            <h1>Log in</h1>
            <form
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
            </form>
        </>
    )
}

export default Login
