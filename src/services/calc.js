export const calcWaterPoints = (actual, weight) => {
    if (!weight) return 0

    const multipler = 1.25
    const p = (actual / (weight / 2)) * 100

    if (p <= 50) {
        return 1 * multipler
    } else if (p <= 65) {
        return 2 * multipler
    } else if (p <= 80) {
        return 3 * multipler
    } else if (p <= 90) {
        return 4 * multipler
    } else {
        return 5 * multipler
    }
}

export const calcFoodPoints = (actual, goal, veggies = false) => {
    if (!goal) return 0

    const vegMultiplier = veggies ? 1.25 : 1
    const p = (actual / goal) * 100

    if (p <= 25) {
        return 1 * vegMultiplier
    } else if (p <= 50) {
        return 2 * vegMultiplier
    } else if (p <= 75) {
        return 3 * vegMultiplier
    } else if (p <= 100) {
        return 4 * vegMultiplier
    } else {
        if (veggies) {
            return 5 * vegMultiplier
        }

        // Penalty for exceeding recommended of non-veg
        return 3
    }
}

export const calcSleepPoints = actual => {
    if (actual <= 5) {
        // No points for minimal sleep.
        return 0
    } else if (actual <= 6) {
        return 1
    } else if (actual < 7) {
        return 2
    } else if (actual >= 7 && actual <= 9) {
        // 7-9 hours is ideal
        return 5
    } else {
        return 4 // more than 9 hours
    }
}

export const calculateEatSlowlyPoints = num => {
    if (num >= 3) {
        return 3
    }
    return num >= 1 ? num : 0
}

export const calculatePoints = (items, user) => {
    let points = 0

    points += items?.workout ? 1 : 0

    points += calcFoodPoints(items?.carbs || 0, user.goal_carbs)

    points += calcFoodPoints(items?.protein || 0, user.goal_protein)

    points += calcFoodPoints(items?.veggies || 0, user.goal_veggies, true)

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

const getPearsonCorrelationText = correlation => {
    let text = ''
    if (correlation >= -0.1 && correlation <= 0.1) {
        text = 'No'
    } else if (correlation >= -0.45 && correlation <= 0.45) {
        text = 'Weak'
    } else if (correlation >= -0.85 && correlation <= 0.85) {
        text = 'Moderate'
    } else {
        text = 'Strong'
    }

    if (correlation < 0 && text !== 'No') {
        text += ' negative'
    } else if (correlation > 0 && text !== 'No') {
        text += ' positive'
    }
    text += ' correlation'
    return text
}

export const pearsonCorrelation = (x, y) => {
    /**
     * Both x and y are arrays of numbers.
     *
     * Calculate Pearson correlation coefficent of arrays of equal length.
     * Numerator is sum of the multiplication of (x - x_avg) and (y - y_avg).
     * Denominator is the squart root of the product between the sum of
     * (x - x_avg)^2 and the sum of (y - y_avg)^2.
     */

    let n = x.length
    let idx = Array.from({ length: n }, (z, i) => i)

    // Averages
    let avgX = x.reduce((a, b) => a + b) / n
    let avgY = y.reduce((a, b) => a + b) / n

    let numMult = idx.map(i => (x[i] - avgX) * (y[i] - avgY))
    let numerator = numMult.reduce((a, b) => a + b)

    let denomX = idx.map(i => Math.pow(x[i] - avgX, 2)).reduce((a, b) => a + b)
    let denomY = idx.map(i => Math.pow(y[i] - avgY, 2)).reduce((a, b) => a + b)
    let denominator = Math.sqrt(denomX * denomY)

    const correlation = numerator / denominator

    const txt = getPearsonCorrelationText(correlation)

    return { value: correlation, text: txt }
}
