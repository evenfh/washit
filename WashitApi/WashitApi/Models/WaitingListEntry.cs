namespace WashitApi.Models
{
    public class WaitingListEntry
    {
        public string? Id { get; set; }
        public WashTypeEnum WashType { get; set; }
        public DateTime StartDate { get; set; }
    }
}
