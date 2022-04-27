import React from 'react'
import { Link } from '@mui/material'
import style from './style.css'

const BLink = ({ children, ...rest }) => {
    return (
        <Link {...rest} className={style.link} underline='hover'>{children}</Link>
    );
};

export default BLink;