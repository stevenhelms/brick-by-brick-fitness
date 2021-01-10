import React from 'react'
import config from '../../config'
import { Instagram, Facebook, Mail } from 'react-feather'
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
    margin-right: 40px;
    :last-child() {
        margin-right: 0;
    }
    @media screen and (max-width: 480px) {
        display: block;
        text-align: center;
        float: none;
        margin-right: 10px;
    }
`
const aStyle = css`
    color: white;
`

const Footer = () => {
    return (
        <footer id="footer" css={footerStyle}>
            <ul css={ulStyle}>
                {config.socialLinks.map(social => {
                    const { name, url } = social
                    return (
                        <li css={liStyle} key={url}>
                            <a href={url} css={aStyle}>
                                <span className="label">
                                    {name === 'Instagram' ? (
                                        <Instagram />
                                    ) : name === 'Facebook' ? (
                                        <Facebook />
                                    ) : (
                                        <Mail />
                                    )}{' '}
                                    {name}
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
            <ul css={ulStyle}>
                <li css={liStyle}>
                    &copy;{new Date().getFullYear()} <a href="https://www.bearstategym.com">Bear State Gym</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
