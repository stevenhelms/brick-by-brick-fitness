export const isAdmin = role => {
    if (role.includes('admin')) {
        return true
    }
    return false
}
