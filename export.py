"""
This will export a CSV of all the users and their points. This can be helpful to pass
off to other staff for analysis and follow-ups.

"""
import os
from firebase import Firebase
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

config = {
    "apiKey": os.getenv("GATSBY_FIREBASE_API_KEY"),
    "authDomain": os.getenv("GATSBY_FIREBASE_AUTH_DOMAIN"),
    "databaseURL": os.getenv("GATSBY_FIREBASE_DATABASE_URL"),
    "storageBucket": os.getenv("GATSBY_FIREBASE_STORAGE_BUCKET"),
    "serviceAccount": "../brick-by-brick-fitness-firebase-adminsdk-fb1j4-fcdf90d9b5.json",
}


def setup():
    firebase = Firebase(config)
    db = firebase.database()
    return db


def upload_new(db, key, value):
    print(f"Uploading to /users/{key}/totals/points2 = {value}")

    db.child("users").child(key).child("totals").update({"points2": value})


def main():
    results = []
    db = setup()
    users = db.child("users").get()

    fields = {
        "first": "firstName",
        "last": "lastName",
        "email": "email",
        "bmr": "bmr",
        "weight": "startingWeight",
        "weight_end": "endingWeight",
        "bmi_start": "startingBMI",
        "bmi_end": "endingBMI",
        "pbf_start": "startingPBF",
        "pbf_end": "endingPBF",
        "smm_start": "startingSMM",
        "smm_end": "endingSMM",
        "journal": "journalEntries",
        "totals/points": "totalPoints",
    }

    for user in users.each():
        key = user.key()
        data = user.val()

        # if key != "steven-helms@gmail-com":
        #     continue

        # if not "journal" in data:
        #     continue

        row = []
        for f in fields:
            if f in data:
                if f == "journal":
                    row.append(len(data[f]))
                else:
                    row.append(data[f])
                continue

            if f.startswith("totals"):
                if "totals" in data:
                    row.append(data["totals"]["points"])
                else:
                    row.append(0)
                continue

            # This is our fail-safe if we don't have the data.
            # Keepin' it simple for now.
            row.append("")

        results.append(row)
        # upload_new(db, key, num)

    new = sorted(results, key=lambda k: k[0], reverse=False)
    headers = []
    for f in fields:
        headers.append(fields[f])
    print(headers)
    for item in new:
        print(item)

    # complete = headers + new
    df = pd.DataFrame(new, columns=headers)
    print(df)
    df.to_csv("results.csv")


if __name__ == "__main__":
    main()
