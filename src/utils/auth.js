export const isAdmin = role => {
    if (typeof role !== 'undefined' && role.includes('admin')) {
        return true
    }
    return false
}
