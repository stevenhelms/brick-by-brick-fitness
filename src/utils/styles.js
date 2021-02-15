import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const colors = {
    primaryOrange: '#e25a2d',
    typography: '#4E4E4E',
    typographyGrayed: '#4E4E4E90',
    typographyGrayed2: '#4E4E4E98',
    lightGray: '#aeaeae',
    veryLightGray: '#eeeeee',
    background: '#171717',
}

export const Div = styled.div``

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    // border: 1px solid ${colors.lightGray};
    // border-radius: 3px;
    // padding: 20px;
    // margin-bottom: 20px;
`

export const Heading = styled.div`
    border-bottom: 1px solid ${colors.lightGray};
`

export const H1 = styled.h1`
    margin-top: 0;
    color: ${colors.primaryOrange};
`

export const H2 = styled.h2`
    margin: 0 auto;
    color: ${colors.primaryOrange};
`

export const H3 = styled.h3`
    margin-top: 0;
    margin-bottom: 10px;
    color: ${colors.primaryOrange};
`
export const H4 = styled.h4`
    margin-top: 0;
    margin-bottom: 10px;
    color: ${colors.typographyGrayed};
`

export const Ul = styled.ul`
    list-style: none;
`
export const Li = styled.li`
    display: inline;
    margin-right: 30px;
`

export const Button = styled.button`
    ${({ disabled }) =>
        disabled ? 'background-color: ' + colors.typographyGrayed + ';' : 'background-color: #e25a2d;'}
    border: 0;
    color: #ffffff;
    border-radius: 3px;
    padding: 5px 20px;
    cursor: pointer;
`

export const BodyText = styled.div`
    margin-bottom: 20px;
`

export const BorderDiv = styled.div`
    border: 1px solid ${colors.lightGray};
    border-radius: 3px;
    padding: 20px;
    margin: 20px 0;
    width: 100%;
`

export const Error = styled.div`
    color: red;
`

export const FlexRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (max-width: 480px) {
        ${({ mobileColumn }) => mobileColumn && 'flex-direction: column; '}
    }
`

export const Form = styled.form``

export const FormInput = styled.input`
    border-radius: 3px;
`

export const FormGroup = styled.div`
  margin: 10px 0;
  padding-bottom: 5px;
  display: block;
  ${({ borderBottom }) => borderBottom && 'border-bottom: 1px solid ' + colors.lightGray + ';'}
  :last-child {
    border-bottom: none;
  }
}
`

export const FormLabel = styled.label`
    display: inline-block;
    width: 100%;
    padding: 0;
`

export const FormSubText = styled.div`
    width: 100%;
    padding: 0;
    color: ${colors.typographyGrayed};
    font-size: 80%;
`

export const ItemContainer = styled.div`
    flex: 1;
    margin-bottom: 20px;
    border-bottom: 1px solid ${colors.veryLightGray};
`
export const ItemHeader = styled.div`
    color: ${colors.typographyGrayed};
    font-weight: 700;
`
export const ItemRow = styled.div`
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid ${colors.veryLightGray};
    font-size: smaller;
    ${({ extraSpace }) => extraSpace && 'padding: 8px 0;'}

    @media screen and (max-width: 480px) {
        // display: inline-block;
        padding-left: 10px;
        flex-direction: column;
    }
`
export const ItemGroup = styled.div`
    flex: 1;
    display: flex;
`
export const ItemLabel = styled.div`
    color: ${colors.typographyGrayed};
    font-weight: 700;
    flex: 2;
`
export const ItemValue = styled.div`
    flex: 3;
`

export const italics = css`
    font-style: italic;
`

export const inputMargin = css`
    margin: 0 5px 0 10px;
`

const colorScale = ['#e25a2d', '#787276']
const baseLabelStyles = {
    fontFamily: "'Helvetica Neue', 'Helvetica', sans-serif",
    fontSize: 10,
    letterSpacing: 'normal',
    padding: 8,
    fill: 'grey',
    stroke: 'transparent',
    strokeWidth: 0,
}

export const graphStyles = {
    colorScale: colorScale, // #e25a2d, alt orange #ed7014
    baseLabelStyles: baseLabelStyles,
    title: {
        fill: colorScale[0],
        fontSize: 22,
    },
    axisZero: {
        axis: { stroke: '#8d4004', strokeWidth: 1 },
        ticks: { stroke: '#8d4004', strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: '#8d4004' },
    },
    seriesOne: {
        data: { stroke: colorScale[0], fillOpacity: 1, fill: colorScale[0], strokeWidth: 0 },
        labels: { ...baseLabelStyles, fontSize: 10 },
    },
    lineOne: {
        data: { stroke: colorScale[0], strokeWidth: 1, opacity: 0.7 },
        labels: { ...baseLabelStyles, fill: colorScale[0], fontSize: 10 },
    },
    axisOne: {
        axis: { stroke: colorScale[0], strokeWidth: 1 },
        ticks: { stroke: colorScale[0], strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: colorScale[0] },
    },
    seriesTwo: {
        data: { stroke: colorScale[1], fillOpacity: 1, fill: colorScale[1], strokeWidth: 0 },
        labels: { ...baseLabelStyles, fill: colorScale[1] },
    },
    lineTwo: {
        data: { stroke: colorScale[1], strokeWidth: 1, opacity: 0.7 },
        labels: { ...baseLabelStyles, fill: colorScale[1] },
    },
    axisTwo: {
        ticks: { stroke: colorScale[1], strokeWidth: 1, size: 5 },
        tickLabels: { ...baseLabelStyles, fill: colorScale[1] },
    },
}
