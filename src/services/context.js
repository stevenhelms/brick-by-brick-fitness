import React, { createContext, useContext, useReducer } from 'react'

export const isBrowser = () => typeof window !== 'undefined'

export const appState = {
    release: 'release',
    loading: false,
    profile: {},
    user: {},
}

const reducer = (current, action) => {
    const { type, value } = action
    let newState

    switch (type) {
        case 'SET_RELEASE':
            newState = {
                ...current,
                release: value,
            }
            break
        case 'SET_PROFILE':
            newState = {
                ...current,
                profile: value,
            }
            break
        case 'SET_USER':
            newState = {
                ...current,
                user: value,
            }
            break
        default:
            break
    }

    isBrowser() && window.localStorage.setItem('state', JSON.stringify(newState))
    return newState
}
const existingState = isBrowser() ? JSON.parse(window.localStorage.getItem('state')) : {}
const currentState = { ...appState, ...existingState }
// console.log(currentState)
const AppContext = createContext(currentState)

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, currentState)

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
