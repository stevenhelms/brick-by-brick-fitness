/**
 *
 *
 * @param {object} data
 */
export const makeUserList = data => {
    let users = []
    data.users.edges.forEach(user => {
        users.push(user.node)
    })

    return users
}

export const calcIndividualPoints = data => {
    // let results
    const users = makeUserList(data)
    console.log(users)
}

const calcWaterPoints = (actual, weight) => {
    const p = (actual / (weight / 2)) * 100

    if (p <= 50) {
        return 1
    } else if (p <= 65) {
        return 2
    } else if (p <= 80) {
        return 3
    } else if (p <= 90) {
        return 4
    } else {
        return 5
    }
}

const calcFoodPoints = (actual, goal) => {
    const p = (actual / goal) * 100

    if (p <= 25) {
        return 1
    } else if (p <= 50) {
        return 2
    } else if (p <= 75) {
        return 3
    } else {
        return 4
    }
}

const calcSleepPoints = actual => {
    if (actual <= 5) {
        return 1
    } else if (actual <= 6) {
        return 2
    } else if (actual <= 7) {
        return 3
    } else if (actual <= 8) {
        return 4
    } else {
        return 5
    }
}

export const calculatePoints = (items, user) => {
    let points = 0

    points += items?.workout ? 1 : 0

    points += calcFoodPoints(items?.carbs || 0, user.goal_carbs)

    points += calcFoodPoints(items?.protein || 0, user.goal_protein)

    points += calcFoodPoints(items?.veggies || 0, user.goal_veggies)

    points += calcWaterPoints(items?.water || 0, user.weight)

    points += calcSleepPoints(items?.sleep || 0)

    console.log(`calculatePoints = ${points}`)
    return points
}
