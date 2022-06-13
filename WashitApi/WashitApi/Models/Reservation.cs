
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WashitApi.Models
{
    public enum WashTypeEnum
    {
        Kokvask,
        Toyvask,
        Handvask
    }
    public class Reservation
    {
        public string? Id { get; set; }
        public int MachineId { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public WashTypeEnum WashType { get; set; }
        public DateTime? Date { get; set; }
    }
}
