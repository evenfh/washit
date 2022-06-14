using WashitApi.Models;

namespace WashitApi.Services
{
    public class WaitingListService : IWaitingListService
    {

        private readonly WaitingListContext _waitingListContext;
        private readonly ReservationContext _reservationContext;

        public WaitingListService(WaitingListContext waitingListContext, ReservationContext reservationContext)
        {
            _waitingListContext = waitingListContext;
            _reservationContext = reservationContext;
        }

        public string AddToWaitingList(WaitingListEntry waitingListEntry)
        {
            var id = Guid.NewGuid().ToString();
            waitingListEntry.Id = id;
            _waitingListContext.Add(waitingListEntry);
            _waitingListContext.SaveChanges();
            return id;
        }


        public MachineAvailability CheckAvailability(string waitingListEntryId)
        {
            
            var waitingListEntry = _waitingListContext.WaitingList.First(waitingListEntry => waitingListEntry.Id == waitingListEntryId);
            var machineAvailability = new MachineAvailability()
            {
                Date = waitingListEntry.StartDate,
                IsAvailable = false,
                MachineId = 1,
                WashType = waitingListEntry.WashType
            };

            // First check if there are machines not in use
            var machineNotInUse = GetMachineNotInUse();
            if (machineNotInUse != -1)
            {
                machineAvailability.IsAvailable = true;
                machineAvailability.MachineId = machineNotInUse;
                return machineAvailability;
            }


            var sortedReservations = _reservationContext.Reservations.OrderBy(r => r.Date).GroupBy(r => r.MachineId).ToDictionary(r => r.Key, r => r.ToList());
            var washDuration = GetDurationFromWashType(waitingListEntry.WashType);

            // Check for each machine if there is an available time slot
            foreach (var key in sortedReservations.Keys)
            {
                machineAvailability.MachineId = key; // Update the machine that is currently checked for availability
                machineAvailability.Date = waitingListEntry.StartDate; // Try first with user selected date
                foreach (var reservation in sortedReservations[key])
                {
                    var startTimeNextReservation = reservation.Date!;

                    if (IsTimeAvailable(startTimeNextReservation, machineAvailability.Date, washDuration))
                    {
                        machineAvailability.IsAvailable = true;
                        return machineAvailability;
                    }
                    machineAvailability.Date = startTimeNextReservation.AddMinutes(10 + GetDurationFromWashType(reservation.WashType));
                }
            }

            // Finally check if start date is within the next 24 hours
            if(machineAvailability.Date < DateTime.Now.AddHours(24))
            {
                machineAvailability.IsAvailable = true;
            }

            return machineAvailability;

        }

        private static bool IsTimeAvailable(DateTime? startTimeNextReservation, DateTime? possibleStartDateTime, int washDuration)
        {
            if (startTimeNextReservation == null || possibleStartDateTime == null)
            {
                return false;
            }
            return possibleStartDateTime.Value.AddMinutes(washDuration) < startTimeNextReservation;
        }

        public int GetMachineNotInUse()
        {
            var machinesInUse = _reservationContext.Reservations.Select(reservation => reservation.MachineId).Distinct().ToHashSet();

            var machines = new HashSet<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };

            if (machinesInUse.Count == machines.Count)
            {
                return -1;
            }

            var machinesNotInUse = machines.Except(machinesInUse);
            return machinesNotInUse.First();
        }

        private static int GetDurationFromWashType(WashTypeEnum washType)
        {
            switch (washType)
            {
                case WashTypeEnum.Kokvask:
                    return 90;
                case WashTypeEnum.Toyvask:
                    return 60;
                case WashTypeEnum.Handvask:
                    return 20;
                default: return 90;
            }
        }
    }
}
