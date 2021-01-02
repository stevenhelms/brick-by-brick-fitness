export const emailToKey = email => {
    // Strip out all spaces.
    // Convert periods to dashes.
    return email.replace(/\s/g, '').replace(/\./g, '-')
}
