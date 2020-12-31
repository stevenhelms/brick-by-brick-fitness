import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Dashboard = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Dashboard</h1>
    <form data-netlify="true" name="Daily Log" method="POST">
      <label htmlFor="goal_veggies">
        Servings of Veggies: <input type="text" name="goal_veggies" />
      </label>
    </form>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Dashboard
