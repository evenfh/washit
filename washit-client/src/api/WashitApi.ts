import { WashType } from "../models/WashType";
import { removeReservationFromLocalStorage } from "../util";

export interface Reservation {
    id?: string;
    machineId: number;
    washType: WashType;
	date: string;
}


export const getReservations = async (callbackFunc: (r: Record<number, Reservation[]>) => void) => {
    const res = await fetch('http://localhost:5010/api/reservation');
    const json = await res.json();
    
    callbackFunc(json);
}

export const addReservation = async (reservation: Reservation) => {
    const res = await fetch('http://localhost:5010/api/reservation', {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: new Headers({'content-type': 'application/json'})
    });
    if (res.ok) {
        return await res.json();
    } else {
        return Promise.reject(res);
    }
}

export const deleteReservation = async (id: string) => {
    console.log(id)
    const res = await fetch(`http://localhost:5010/api/reservation/${id}`, {
        method: 'DELETE',
    });
    removeReservationFromLocalStorage(id)
}