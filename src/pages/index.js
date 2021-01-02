import React from 'react'
// import { graphql } from 'gatsby'

import { AppProvider } from '../services/context'
import Layout from '../components/layout'
import Home from '../components/home'
import SEO from '../components/seo'

const Index = ({ data }) => (
    <AppProvider>
        <Layout>
            <SEO title="Home" />
            <Home data={data} />
        </Layout>
    </AppProvider>
)

/*export const query = graphql`
    query Players {
        users: allUsers {
            nodes {
                age
                createdAt
                email
                first
                gender
                goal_carbs
                goal_protein
                goal_veggies
                goal_weight
                height
                id
                last
                pbf_end
                pbf_start
                updatedAt
                weight
            }
            edges {
                node {
                    age
                    createdAt
                    email
                    first
                    gender
                    goal_carbs
                    goal_protein
                    goal_veggies
                    goal_weight
                    height
                    id
                    last
                    pbf_end
                    pbf_start
                    updatedAt
                    weight
                }
                next {
                    id
                }
            }
        }
        journals: allWinter21(sort: { order: DESC, fields: total_points }, limit: 5) {
            nodes {
                total_points
                user_id
                id
                carbs
                eat_slowly
                protein
                recovery
                sleep
                stress
                veggies
                water
                workout
            }
        }
    }
`
*/

export default Index
