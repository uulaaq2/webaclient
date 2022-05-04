import React from 'react'
import { Link } from '@mui/material'
import style from './style.css'

const BLink = ({ children, variant, ...rest }) => {
    if (!variant) {
        variant = 'body2'
    }
    return (
        <Link variant={variant} {...rest} className={style.link} underline='hover'>{children}</Link>
    );
};

export default BLink;