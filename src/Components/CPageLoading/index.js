import mdouleStyle from './style.css'
import React from 'react'
import { CircularProgress } from '@mui/material'

const PageLoading = () => {
    return (
        <div className={mdouleStyle.page}>
            <CircularProgress />
        </div>
    );
};

export default PageLoading