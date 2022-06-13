import React, { useState } from 'react'
import { addReservation, Reservation } from '../api/WashitApi'
import { WashType } from '../models/WashType'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Button, CircularProgress, Dialog, DialogTitle, IconButton, Snackbar } from '@mui/material';
import './MachineReservation.css'
import TimeSelection from './TimeSelection';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import { addReservationToLocalStorage, dateToDateString } from '../util';
import { CloseOutlined } from '@mui/icons-material';

export interface MachineReservationProps {
    reservations: Reservation[];
    washType: WashType;
    machineId: number;
}

function MachineReservation(props: MachineReservationProps) {
    const { reservations, washType, machineId } = props
    let navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [date, setDate] = useState<Date>();
    const [loading, setLoading] = useState(false)

    const onReserve = (newDate: Date) => {
        setDate(newDate)
        setOpenDialog(true)
    }

    const handleCloseDialog = async (confirm: boolean) => {
        setOpenDialog(false);

        if (!confirm) {
            return;
        }
        if (date === undefined) {
            console.error("No date")
            return;
        }
        const dateString = dateToDateString(date);
        const reservation: Reservation = {
            date: dateString,
            washType: washType,
            machineId: machineId
        }
        setLoading(true);
        try {
            const reservationWithId = await addReservation(reservation);
            addReservationToLocalStorage(reservationWithId)
            onReservationAdded();
        } catch {
            setOpenSnackbar(true)
        } finally {
            setLoading(false)
        }
    };

    const onReservationAdded = () => {
        navigate("/reservasjoner", { replace: true });
    }

    const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setOpenSnackbar(false);
    };

    const snackbarAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseOutlined fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <div className='card'>
                <LocalLaundryServiceIcon style={{ fontSize: '90px' }} />
                <TimeSelection washType={washType} reservations={reservations} onReserve={onReserve} />
            </div>
            {
                loading &&
                <div className="loadingOverlay">
                    <CircularProgress />
                </div>
            }

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                message="Noe gikk galt. Vennligst velg en ledig tid"
                action={snackbarAction}
            />

            <ConfirmationDialog
                keepMounted
                washType={washType}
                machineId={machineId}
                date={date}
                open={openDialog}
                onClose={handleCloseDialog}
            />
        </>

    )
}

export default MachineReservation

