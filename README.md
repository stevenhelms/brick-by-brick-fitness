<p align="center">
  <a href="https://www.bearstategym.com">
    <img alt="Bear State Gym" src="http://bearstategym.com/wp-content/uploads/2020/08/Bear-State-Gym-Logo-1.png" width="60" />
  </a>
</p>
<h1 align="center">
  Bear State Gym - Nutrition Challenge Winter 2021
</h1>

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
  goal_carbs: Number
  goal_protein: Number
  goal_veggies: Number
  goal_weight: Number
  height: Number
  last: String
  pbf_end: Number
  pbf_start: Number
  updatedAt: Timestamp
  weight: Number
  journal: Array
}
```

### Journal Array Objects

```
{
  id: String
  carbs: Number
  eat_slowly: Number
  protein: Number
  recovery: Number
  sleep: Number
  stress: Number
  total_points: Number
  user_id: String
  veggies: Number
  water: Number
  workout: Boolean
}
```
