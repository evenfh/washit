using WashitApi.Models;

namespace WashitApi.Services
{
    public class ReservationService : IReservationService
    {

        private readonly ReservationContext _reservationContext;

        public ReservationService(ReservationContext reservationContext)
        {
            _reservationContext = reservationContext;
        }
        public Reservation AddReservation(Reservation reservation)
        {
            if (IsConflict(reservation))
            {
                throw new ArgumentException("Invalid Date");
            }
            var id = Guid.NewGuid().ToString();
            reservation.Id = id;
            _reservationContext.Add(reservation);
            _reservationContext.SaveChanges();
            return reservation;
        }

        public void DeleteReservation(string id)
        {
            var reservation = _reservationContext.Reservations.First(r => r.Id == id);
            _reservationContext.Reservations.Remove(reservation);
            _reservationContext.SaveChanges();
        }

        public IEnumerable<Reservation> GetReservationsForMachine(int machineId)
        {
            var reservations = _reservationContext.Reservations.Where(r => r.MachineId == machineId);
            return reservations.OrderBy(r => r.Date).ToList();
        }

        public Dictionary<int, List<Reservation>> GetAllReservations()
        {
            var reservations = _reservationContext.Reservations.ToList();
            return reservations.OrderBy(r => r.Date).GroupBy(r => r.MachineId).ToDictionary(r => r.Key, r => r.ToList());
        }

        private bool IsConflict(Reservation reservation)
        {
            if(reservation.Date == null)
            {
                return true;
            }
            var reservations = GetReservationsForMachine(reservation.MachineId).ToList();
            var reservationDuration = 60;
            foreach (var r in reservations)
            {
                var priorReservationDate = r.Date;
                if (reservation.Date <= priorReservationDate)
                {
                    var timeToNextReservation = (priorReservationDate - reservation.Date).Value.TotalMinutes;
                    if (timeToNextReservation < reservationDuration)
                    {
                        return true;
                    }
                }
                if(reservation.Date >= priorReservationDate)
                {
                    var timeSincePreviousReservation = (reservation.Date - priorReservationDate).Value.TotalMinutes;
                    if (timeSincePreviousReservation < reservationDuration)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
