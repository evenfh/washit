import { Button } from '@mui/material';
import React, { useState } from 'react'
import { WashType } from '../models/WashType';
import './Home.css';
import ReservationPage from './ReservationPage';

function Home() {
    const [selectedWash, setWash] = useState<WashType | undefined>();

    const onWashSelectionClicked = (washType: WashType) => {
        setWash(washType)
    }

    return (
        <main>
            <h2>Velg Type Vask: </h2>
            <div className="button-container">
                <Button
                    variant={selectedWash === WashType.Kokvask ? 'contained' : 'outlined'}
                    onClick={() => onWashSelectionClicked(WashType.Kokvask)}
                >
                    Kokvask
                </Button>
                <Button
                    variant={selectedWash === WashType.Toyvask ? 'contained' : 'outlined'}
                    onClick={() => onWashSelectionClicked(WashType.Toyvask)}
                >
                    Tøyvask
                </Button>
                <Button
                    variant={selectedWash === WashType.Handvask ? 'contained' : 'outlined'}
                    onClick={() => onWashSelectionClicked(WashType.Handvask)}
                >
                    Håndvask
                </Button>
            </div>
            {
                selectedWash !== undefined ? <ReservationPage washType={selectedWash} /> : <div />
            }
        </main>
    )
}

export default Home