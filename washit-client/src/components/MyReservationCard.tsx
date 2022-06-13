import { DeleteOutline } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React from 'react'
import { deleteReservation, Reservation } from '../api/WashitApi'
import { removeReservationFromLocalStorage } from '../util'

export interface MyReservationCardProps {
    reservation: Reservation
}

function MyReservationCard(props: MyReservationCardProps) {
    const {reservation} = props

    const onDelete = async () => {
        await deleteReservation(reservation.id ?? '');
        removeReservationFromLocalStorage(reservation.id ?? '')
    }

    return (
        <div>
            {reservation.date}
            <IconButton onClick={onDelete}>
                <DeleteOutline />
            </IconButton>
        </div>
    )
}

export default MyReservationCard