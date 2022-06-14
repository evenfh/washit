using WashitApi.Models;

namespace WashitApi.Services
{
    public interface IReservationService
    {
        IEnumerable<Reservation> GetReservationsForMachine(int machineId);
        Reservation AddReservation(Reservation reservation);
        void DeleteReservation(string id);
        Dictionary<int, List<Reservation>> GetAllReservations();
    }
}
