namespace WashitApi.Models
{
    public class MachineAvailability
    {
        public int MachineId { get; set; }
        public DateTime Date { get; set; }
        public bool IsAvailable { get; set; }
        public WashTypeEnum WashType { get; set; }
    }
}
