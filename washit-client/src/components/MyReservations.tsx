import React, { useEffect, useState } from 'react'
import { Reservation } from '../api/WashitApi';
import { getReservationsFromLocalStorage } from '../util'
import MyReservationCard from './MyReservationCard'

function MyReservations() {
    const [myReservations, setMyReservations] = useState<Reservation[]>(getReservationsFromLocalStorage())

    useEffect(() => {
        window.addEventListener('storage', () => {
            setMyReservations(getReservationsFromLocalStorage());
        })
    }, []);


    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            <h2>Mine Reservasjoner</h2>
            {
                myReservations.map((r) => <MyReservationCard reservation={r} key={`my-reservatioins-${r.id}`}/>)
            }
        </div>
    )
}

export default MyReservations