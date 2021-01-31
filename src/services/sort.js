/*
 * Sort leader board in decending order by points.
 */
export const sortByTotalPoints = (a, b) => {
    const x = a.totals?.points ? a.totals.points : 0
    const y = b.totals?.points ? b.totals.points : 0

    return y - x // Decending order
}

export const sortByFirst = (a, b) => {
    if (a.first === b.first) {
        return 0
    } else if (a.first < b.first) {
        return 1
    } else {
        return -1
    }
}
