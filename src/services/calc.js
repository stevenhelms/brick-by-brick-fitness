export const calcWaterPoints = (actual, weight) => {
    if (!weight) return 0

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

export const calcFoodPoints = (actual, goal) => {
    if (!goal) return 0

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

export const calcSleepPoints = actual => {
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

export const calculateEatSlowlyPoints = num => {
    return num >= 3 ? 3 : num === 2 ? 2 : num === 1 ? 1 : 0
}

export const calculatePoints = (items, user) => {
    let points = 0

    points += items?.workout ? 1 : 0

    points += calcFoodPoints(items?.carbs || 0, user.goal_carbs)

    points += calcFoodPoints(items?.protein || 0, user.goal_protein)

    points += calcFoodPoints(items?.veggies || 0, user.goal_veggies)

    points += calcWaterPoints(items?.water || 0, user.weight)

    points += calcSleepPoints(items?.sleep || 0)

    points += calculateEatSlowlyPoints(items?.eat_slowly)

    console.log(`Calculated points: ${points}`)
    return points
}

export const feetToInches = (feet, inches) => {
    return feet * 12 + inches
}

export const inchesToFeet = inches => {
    const f = Math.floor(inches / 12)
    const i = inches - f * 12
    return [f, i]
}
