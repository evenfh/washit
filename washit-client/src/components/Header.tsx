import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
    const navigate = useNavigate()

    const onNavigate = (route: string) => {
        navigate(route, {replace: true})
    }

    return (
        <header>
            <Button variant='text' style={{ color: 'black' }} onClick={() => onNavigate('/')}>
                Reserver
            </Button>
            <Button variant='text' style={{ color: 'black' }} onClick={() => onNavigate('/reservasjoner')}>
                Mine reservasjoner
            </Button>
        </header>
    )
}

export default Header