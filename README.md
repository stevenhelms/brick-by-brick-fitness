<p align="center">
  <a href="https://www.brickbybrickfitness.org">
    <img alt="Brick by Brick Fitness" src="https://www.brickbybrickfitness.org/wp-content/uploads/2021/05/bb_logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  Brick by Brick Fitness - Nutrition Challenge 2022
</h1>

![Build Status](https://github.com/stevenhelms/brick-by-brick/workflows/Firebase%20Hosting%20on%20merge/badge.svg)

## 🚀 Quick start

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd bear-state-winter21/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `bear-state-winter21` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

-   **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

-   **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

## Data Structures

### Users

```
{
  id: String
  age: Number
  createdAt: Timestamp
  email: String
  first: String
  gender: String
  goal_calories: Number
  goal_carbs: Number
  goal_protein: Number
  goal_veggies: Number
  goal_weight: Number
  height: Number
  journal: Array
  last: String
  pbf_end: Number
  pbf_start: Number
  total_points: Number
  updatedAt: Timestamp
  weight: Number
}
```

### Journal Array Objects

```
{
  carbs: Number
  eat_slowly: Number
  journalDate: Date
  protein: Number
  recovery: Number
  sleep: Number
  stress: Number
  veggies: Number
  water: Number
  workout: Boolean
  total_points: Number
  createdAt: DateTime
  updatedAt: DateTime
}
```
