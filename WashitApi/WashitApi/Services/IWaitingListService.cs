using WashitApi.Models;

namespace WashitApi.Services
{
    public interface IWaitingListService
    {
        public string AddToWaitingList(WaitingListEntry waitingListEntry);
        public MachineAvailability CheckAvailability(string waitingListEntryId);
    }
}
