import { Reservation } from "./api/WashitApi";
import { WashType } from "./models/WashType"


export const getDurationFromWashType = (washType: WashType) => {
    switch (washType) {
        case WashType.Kokvask.toString():
            return 90;
        case WashType.Toyvask.toString():
            return 60;
        case WashType.Handvask.toString():
            return 20;
        default:
            return 60
    }
}

export const addReservationToLocalStorage = (reservation: Reservation) => {
    let currentReservationsJson = localStorage.getItem("reservations");
    let currentReservations: Reservation[] = []
    if (currentReservationsJson !== null) {
        currentReservations = JSON.parse(currentReservationsJson) as Reservation[]
    }
    currentReservations.push(reservation)
    localStorage.setItem("reservations", JSON.stringify(currentReservations))
}

export const removeReservationFromLocalStorage = (id: string) => {
    let currentReservationsJson = localStorage.getItem("reservations");
    let currentReservations: Reservation[] = []
    if (currentReservationsJson !== null) {
        currentReservations = JSON.parse(currentReservationsJson) as Reservation[]
    }
    currentReservations = currentReservations.filter((r) => r.id !== id);
    localStorage.setItem("reservations", JSON.stringify(currentReservations))
}

export const getReservationsFromLocalStorage = () => {
    let currentReservationsJson = localStorage.getItem("reservations");
    let currentReservations: Reservation[] = []
    if (currentReservationsJson !== null) {
        currentReservations = JSON.parse(currentReservationsJson) as Reservation[]
    }
    return currentReservations;
}

export const dateToDateString = (date: Date) => {
    const month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    const dateString = `${year}-${month}-${day}T${hour}:${minutes}:00+02:00`
    return dateString;
} 

export const getTimeFromDate = (date: Date) => {
    const hours = date.getHours() >= 10 ? date.getHours() : '0'+date.getHours()
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes()
    return `${hours}:${minutes}`
}