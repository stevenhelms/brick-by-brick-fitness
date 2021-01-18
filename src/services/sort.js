export const sortByTotalPoints = (a, b) => {
    // console.log(`${a.first} vs ${b.first}`)
    // console.log('a', a.totals?.points ? a.totals.points : 'x')
    // console.log('b', b.totals?.points ? b.totals.points : 'y')

    if (a.totals?.points && b.totals?.points) {
        return a.totals.points - b.totals.points
    } else if (!a.totals?.points && !b.totals?.points) {
        return 0
    } else if (!a.totals?.points && b.totals?.points) {
        return -1
    } else {
        return 1
    }
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
