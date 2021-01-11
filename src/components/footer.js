import React from 'react'
import config from '../../config'
import { Instagram, Facebook, Mail, Globe } from 'react-feather'
import { css } from '@emotion/react'
import { colors } from '../utils/styles'

const footerStyle = css`
    margin: 40px auto 0 auto;
    background: ${colors.background};
    color: #ffffff;
    width: 100%;
    text-align: center;
    padding: 40px 0 0 0;
`
const ulStyle = css`
    list-style: none;

    @media screen and (max-width: 480px) {
        margin-left: 0;
    }
`
const liStyle = css`
    display: inline;
    margin: 0 20px;
    :last-child() {
        margin-right: 0;
    }
    @media screen and (max-width: 480px) {
        display: block;
        text-align: center;
        float: none;
        margin: 0 5px;
        padding: 5px 0;
    }
`
const aStyle = css`
    color: white;
`
const grayStyle = css`
    color: ${colors.lightGray};
`

const Footer = () => {
    return (
        <footer id="footer" css={footerStyle}>
            <ul css={ulStyle}>
                {config.socialLinks.map(social => {
                    const { name, url } = social
                    return (
                        <li css={liStyle} key={url}>
                            <a target="_blank" rel="noreferrer" href={url} css={aStyle}>
                                <span className="label">
                                    {name === 'Instagram' ? (
                                        <Instagram />
                                    ) : name === 'Facebook' ? (
                                        <Facebook />
                                    ) : name === 'Email' ? (
                                        <Mail />
                                    ) : (
                                        <Globe />
                                    )}{' '}
                                    {name}
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
            <ul css={ulStyle}>
                <li css={grayStyle}>
                    &copy; {new Date().getFullYear()}{' '}
                    <a css={grayStyle} target="_blank" rel="noreferrer" href="https://shelms.dev/Nutrition">
                        Steve Helms
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
