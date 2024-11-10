import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Spinner() {
    return (
        <CircularProgress sx={{color: 'rgba(0,183,255, 1)'}} size={'4rem'} />
    )
}