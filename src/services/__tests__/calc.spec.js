import { calcSleepPoints, feetToInches, inchesToFeet, calcWaterPoints, calcFoodPoints, calculatePoints } from '../calc'

describe('Calc Functions', () => {
    test('calcSleepPoints 1 hour', () => {
        const returned = calcSleepPoints(1)
        expect(returned).toEqual(1)
    })

    test('calcSleepPoints 5 hours', () => {
        const returned = calcSleepPoints(5)
        expect(returned).toEqual(1)
    })

    test('calcSleepPoints 6 hours', () => {
        const returned = calcSleepPoints(6)
        expect(returned).toEqual(2)
    })

    test('calcSleepPoints 7 hours', () => {
        const returned = calcSleepPoints(7)
        expect(returned).toEqual(3)
    })

    test('calcSleepPoints 8 hours', () => {
        const returned = calcSleepPoints(8)
        expect(returned).toEqual(4)
    })

    test('calcSleepPoints 10 hours', () => {
        const returned = calcSleepPoints(10)
        expect(returned).toEqual(5)
    })

    test('calcFoodPoints 25% goal', () => {
        const returned = calcFoodPoints(1, 8)
        expect(returned).toEqual(1)
    })

    test('calcFoodPoints 50% goal', () => {
        const returned = calcFoodPoints(4, 8)
        expect(returned).toEqual(2)
    })

    test('calcFoodPoints 75% goal', () => {
        const returned = calcFoodPoints(5, 8)
        expect(returned).toEqual(3)
    })

    test('calcFoodPoints >75% goal', () => {
        const returned = calcFoodPoints(7, 8)
        expect(returned).toEqual(4)
    })

    test('calcWaterPoints invalid weight', () => {
        const returned = calcWaterPoints(30, null)
        expect(returned).toEqual(0)
    })

    test('calcWaterPoints <= 50% goal', () => {
        const returned = calcWaterPoints(30, 150)
        expect(returned).toEqual(1)
    })

    test('calcWaterPoints <= 65% goal', () => {
        const returned = calcWaterPoints(45, 150)
        expect(returned).toEqual(2)
    })

    test('calcWaterPoints <= 80% goal', () => {
        const returned = calcWaterPoints(50, 150)
        expect(returned).toEqual(3)
    })

    test('calcWaterPoints <= 90% goal', () => {
        const returned = calcWaterPoints(65, 150)
        expect(returned).toEqual(4)
    })

    test('calcWaterPoints >90% goal', () => {
        const returned = calcWaterPoints(70, 150)
        expect(returned).toEqual(5)
    })

    test('feetToInches', () => {
        const returned = feetToInches(5, 11)
        expect(returned).toEqual(71)
    })

    test('inchesToFeet ', () => {
        const returned = inchesToFeet(71)
        expect(returned[0]).toEqual(5)
        expect(returned[1]).toEqual(11)
    })

    test('calculatePoints minimum possible', () => {
        const items = {
            protein: 0,
            veggies: 0,
            carbs: 0,
            water: 0,
            workout: false,
            sleep: 1,
            eat_slowly: 0,
        }
        const user = {
            goal_carbs: 5,
            goal_protein: 8,
            goal_veggies: 12,
            water: 75,
            weight: 150,
        }
        const points = calculatePoints(items, user)
        expect(points).toEqual(5)
    })

    test('calculatePoints maximum possible', () => {
        const items = {
            protein: 8,
            veggies: 12,
            carbs: 5,
            water: 100,
            workout: true,
            sleep: 10,
            eat_slowly: 4,
        }
        const user = {
            goal_carbs: 5,
            goal_protein: 8,
            goal_veggies: 12,
            water: 75,
            weight: 150,
        }
        const points = calculatePoints(items, user)
        expect(points).toEqual(26)
    })
})
