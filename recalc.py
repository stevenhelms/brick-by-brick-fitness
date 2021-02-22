from firebase import Firebase

config = {
    "apiKey": "AIzaSyCziiAM1cDeMGws0hd4xDbe9mDBh-CzC6E",
    "authDomain": "bear-state.firebaseapp.com",
    "databaseURL": "https://bear-state-default-rtdb.firebaseio.com",
    "storageBucket": "bear-state.appspot.com",
    "serviceAccount": "../bear-state-default-3aa0a6836439.json"
  }

class Calculator:
    user = None
    journal = None

    def __init__(self, user, journal):
        self.user = user
        self.journal = journal

    def slowly_points(self, num):
        if num > 3:
            return 3
        if num < 0:
            return 0
        return num

    def sleep_points(self, actual):
        if (actual <= 5):
            # No points for minimal sleep.
            return 0
        elif (actual <= 6):
            return 1
        elif (actual < 7):
            return 2
        elif (actual >= 7 and actual <= 9):
            # 7-9 hours is ideal
            return 5
        else:
            return 4 # more than 9 hours

    def water_points(self, actual):
        multipler = 1.25
        p = (actual / (self.user['weight'] / 2)) * 100

        if (p <= 50):
            return 1 * multipler
        elif (p <= 65):
            return 2 * multipler
        elif (p <= 80):
            return 3 * multipler
        elif (p <= 90):
            return 4 * multipler
        else:
            return 5 * multipler

    def food_points(self, actual, goal, veggies=False):
        veg_multiplier = 1.25 if veggies else 1

        if goal == 0:
            if actual == goal:
                p = 100
            if actual > goal:
                p = 101
        else:
            p = (actual / goal) * 100

        if (p <= 25):
            return 1 * veg_multiplier
        elif (p <= 50):
            return 2 * veg_multiplier
        elif (p <= 75):
            return 3 * veg_multiplier
        elif (p <= 100):
            return 4 * veg_multiplier
        else:
            if (veggies):
                return 5 * veg_multiplier

            # Penalty for exceeding recommended of non-veg
            return 3


    def single(self, entry):
        points = 0

        if entry['workout'] == True:
            points = points + 1

        points = points + self.food_points(entry['carbs'], self.user['goal_carbs'])

        points = points + self.food_points(entry['protein'], self.user['goal_protein'])

        points = points + self.food_points(entry['fats'], self.user['goal_fats'])

        points = points + self.food_points(entry['veggies'], self.user['goal_veggies'], True)

        points = points + self.water_points(entry['water'])

        points = points + self.sleep_points(entry['sleep'])

        points = points + self.slowly_points(entry['eat_slowly'])

        return points

    def run(self):
        num = 0
        for journal_key in self.journal:
            num = num + self.single(self.journal[journal_key])
        return num

def setup():
    firebase = Firebase(config)
    db = firebase.database()
    return db

def upload_new(db, key, value):
    print(f"Uploading to /users/{key}/totals/points2 = {value}")

    db.child('users').child(key).child('totals').update({ 'points2': value })


def main():
    results = []
    db = setup()
    users = db.child("users").get()

    for user in users.each():
        key = user.key()
        data = user.val()

        # if key != 'steven-helms@gmail-com':
        #     continue

        if not 'journal' in data:
            continue

        num = Calculator(data, data['journal']).run()
        results.append({ "email": data['email'], "total_points": num})
        # upload_new(db, key, num)

    new = sorted(results, key=lambda k: k['total_points'], reverse=True)
    for item in new:
        print(f"{item['email']} {item['total_points']}")



if __name__ == "__main__":
    main()