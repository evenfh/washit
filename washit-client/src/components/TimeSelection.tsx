import React, { useState } from 'react'
import { Reservation } from '../api/WashitApi'
import { WashType } from '../models/WashType'
import { getDurationFromWashType, getTimeFromDate } from '../util';
import './TimeSelection.css';


export interface TimeSelectionProps {
    reservations: Reservation[];
    washType: WashType;
    onReserve: (date: Date) => void;
}

const selectionWidthInPx = 900;
const steps = (24 * 60) / 10.0
const pixelsPerStep = Math.round(selectionWidthInPx / steps)

function TimeSelection(props: TimeSelectionProps) {
    const { reservations, washType, onReserve } = props;
    const [selectionVisible, setSelectionVisible] = useState(false)
    const [selectionRectPosition, setSelectionRectPosition] = useState(0)
    const nowDate = new Date(Date.now())

    const getReservationPosition = (reservation: Reservation) => {
        const reservatioinDateMs = Date.parse(reservation.date);
        const nowMs = nowDate.setMinutes(0)
        const diffMs = reservatioinDateMs - nowMs
        const diffHours = diffMs / 1000.0 / 60.0 / 60.0
        return (diffHours / 24.0) * 100;
    }

    const getReservationWidth = (washType: WashType) => {
        const durationInHours = getDurationFromWashType(washType) / 60.0;
        return (selectionWidthInPx / 24.0) * durationInHours
    }

    const getHourIndicator = (hour: number) => {
        let hourIndicator = nowDate.getHours() + hour;
        if (hourIndicator > 24) {
            hourIndicator = hourIndicator % 24
        }
        return hourIndicator < 10 ? `0${hourIndicator}:00` : `${hourIndicator}:00`
    }

    const getHourPositionPX = (hour: number) => {
        return hour / 12.0 * 900
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const parent: any = e.target
        let mousePositionRelativePX = e.clientX - parent.offsetLeft;
        if (parent.className === 'reservationRect') {
            setSelectionVisible(false)
        } else {
            setSelectionVisible(true)
        }

        if (parent.className == 'selectionRect') {
            mousePositionRelativePX = e.clientX - parent.parentElement.offsetLeft;
        }
        const mousePositionPercent = mousePositionRelativePX / selectionWidthInPx
        const currentStep = Math.floor(steps * mousePositionPercent);
        setSelectionRectPosition(currentStep * pixelsPerStep)
    }

    const getSelectionDate = () => {
        const mousePositionPercent = (selectionRectPosition / selectionWidthInPx)
        const currentStep = Math.floor(steps * mousePositionPercent);
        const stepInMs = currentStep * 10 * 60 * 1000;
        const reservationDate = new Date(nowDate.setMinutes(0) + stepInMs);
        return reservationDate;
    }

    const onReserveClicked = () => {
        const date = new Date (new Date(getSelectionDate().setSeconds(0)).setMilliseconds(0));
        onReserve(date);
    } 

    return (
        <div
            className='container'
            onMouseLeave={() => setSelectionVisible(false)}
            onMouseMove={onMouseMove}
        >
            {
                Array.from({ length: 12 }, (_, i) => i*2).map(hour => <div className='hourIndicator' style={{ left: `${getHourPositionPX(hour/2)}px` }}>{getHourIndicator(hour)}</div>)
            }

            {
                selectionVisible ?
                    <div style={{ left: `${selectionRectPosition}px`, width: `${getReservationWidth(washType)}px` }} className="selectionRect" onClick={onReserveClicked}>
                        {getTimeFromDate(getSelectionDate())}
                    </div> : <div></div>
            }

            {reservations.map(r =>
                <div
                    className='reservationRect'
                    key={`reservation-${r.id}`}
                    style={{ width: `${getReservationWidth(r.washType)}px`, left: `${getReservationPosition(r)}%` }}>
                </div>)
            }
        </div>
    )
}

export default TimeSelection