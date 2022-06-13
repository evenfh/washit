import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getReservations, Reservation } from '../api/WashitApi';
import { WashType } from '../models/WashType'
import MachineReservation from './MachineReservation';

export interface ReservationPageProps {
    washType: WashType
}

const machienes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function ReservationPage(props: ReservationPageProps) {
    const { washType } = props;
    const [reservations, setReservations] = useState<Record<number, Reservation[]>>();

    useEffect(() => {
        getReservations(handleReservationResponse)
    }, [])

    const handleReservationResponse = (reservations: Record<number, Reservation[]>) => {
        console.log(reservations)
        setReservations(reservations)
    }

    return (
        <div>
            {
                reservations === undefined ? <CircularProgress /> :
                    machienes.map(m => <MachineReservation reservations={reservations[m] ?? []} machineId={m} key={`machine-${m}`} washType={washType}/>)
            }
        </div>
    )
}

export default ReservationPage