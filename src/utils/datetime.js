export const utcToLocal = dateInUtc => {
    //Convert to local timezone
    return new Date(dateInUtc.getTime() - dateInUtc.getTimezoneOffset() * 60 * 1000)
}
