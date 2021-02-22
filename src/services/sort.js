/*
 * Sort leader board in decending order by points.
 */
export const sortByTotalPoints = (a, b) => {
    const x = a.totals?.points ? a.totals.points : 0
    const y = b.totals?.points ? b.totals.points : 0

    return y - x // Decending order
}

/*
 * Sort leader board in decending order by points.
 */
export const sortByTotalWeightLoss = (a, b) => {
    const x = a.weight_loss ? a.weight_loss : 0
    const y = b.weight_loss ? b.weight_loss : 0

    return y - x // Decending order
}

/*
 * Sort leader board in decending order by points.
 */
export const sortByTotalPBFLoss = (a, b) => {
    const x = a.pbf_diff ? a.pbf_diff : 0
    const y = b.pbf_diff ? b.pbf_diff : 0

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

export const sortByDate = (a, b) => {
    const da = a.date,
        db = b.date
    if (da < db) {
        return -1
    }
    if (da > db) {
        return 1
    }
    return 0
}
