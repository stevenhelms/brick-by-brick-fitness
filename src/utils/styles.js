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
