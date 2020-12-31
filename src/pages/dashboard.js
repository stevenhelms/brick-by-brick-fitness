import React from "react"
import { Link, navigate } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BodyText = styled.div`
  margin-bottom: 20px;
`

const FormWrapper = styled.div`
  border: 1px solid #aeaeae;
  border-radius: 3px;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
`

const Form = styled.form``

const FormInput = styled.input`
  border-radius: 3px;
`

const FormField = styled.div`
  margin: 10px 0;
  padding-bottom: 5px;
  display: block;
  border-bottom: 1px solid #dddddd;
  :last-child {
    border-bottom: none;
  }
}
`
const FormLabel = styled.label`
  display: inline-block;
  width: 100%;
  padding: 0;
`
const FormSubText = styled.div`
  width: 100%;
  padding: 0;
  color: #999999;
  font-size: 80%;
`

const italics = css`
  font-style: italic;
`
const inputMargin = css`
  margin: 0 5px 0 10px;
`

const handleSubmit = event => {
  console.log(event.target)
  event.preventDefault()
  let formData = new FormData(event.target)
  fetch("/dashboard", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => navigate("/dashboard/"))
    .catch(error => alert(error))
}

const JournalForm = () => {
  return (
    <Form
      id="dailylog"
      data-netlify="true"
      name="Daily Log"
      method="POST"
      onSubmit={handleSubmit}
      style={{ flex: "auto" }}
    >
      <input type="hidden" name="form-name" value="Daily Log" />
      <FormField>
        <FormLabel htmlFor="goal-workout">Workout today:</FormLabel>
        <input
          style={{ transform: "scale(1.5,1.5)" }}
          type="checkbox"
          name="goal-workout"
        />
        {/* <input type="radio" name="goal-workout" value="0" /> No */}
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-water">Ounces of Water:</FormLabel>
        <FormInput type="text" name="goal-water" />
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-protein">Servings of Protein:</FormLabel>
        <FormInput type="text" name="goal-protein" />
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-veggies">Servings of Veggies:</FormLabel>
        <FormInput type="text" name="goal-veggies" />
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-carbs">Servings of Carbs:</FormLabel>
        <FormInput type="text" name="goal-carbs" />
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-sleep">Hours of Sleep:</FormLabel>
        <FormInput type="text" name="goal-sleep" />
      </FormField>
      <FormField>
        <FormLabel htmlFor="goal-eatslow">Ate Slowly:</FormLabel>
        <FormInput type="text" name="goal-eatslow" />
      </FormField>
      <FormField>
        <FormLabel>Physical Recovery</FormLabel>
        <FormInput
          css={inputMargin}
          type="radio"
          name="data-recovery"
          value="1"
        />
        None
        <FormInput
          css={inputMargin}
          type="radio"
          name="data-recovery"
          value="2"
        />
        Minimal
        <input css={inputMargin} type="radio" name="data-recovery" value="3" />
        Somewhat
        <input css={inputMargin} type="radio" name="data-recovery" value="4" />
        Mostly
        <input css={inputMargin} type="radio" name="data-recovery" value="5" />
        Fully
        <FormSubText>
          How do you feel your recovery was this morning? Recovering from the
          previous day's activities is important.
        </FormSubText>
      </FormField>
      <FormField>
        <FormLabel>Stress Level</FormLabel>
        <input css={inputMargin} type="radio" name="data-stress" value="1" />
        None
        <input css={inputMargin} type="radio" name="data-stress" value="2" />
        Minimal
        <input css={inputMargin} type="radio" name="data-stress" value="3" />
        Normal
        <input css={inputMargin} type="radio" name="data-stress" value="4" />
        Manageable
        <input css={inputMargin} type="radio" name="data-stress" value="5" />
        Crazy
        <FormSubText>
          How stressed are you feeling? Stress can inhibit weight loss and
          reduce your overall health.
        </FormSubText>
      </FormField>
      <FormField style={{ textAlign: "center" }}>
        <button type="submit">Submit</button>
      </FormField>
    </Form>
  )
}

const Dashboard = () => (
  <Layout>
    <SEO title="Dashboard" />
    <FormWrapper>
      <BodyText css={italics}>
        Each day you should submit a log of your progress. Only submitted data
        will count towards the challenge.
      </BodyText>
      <JournalForm />
    </FormWrapper>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Dashboard
