using Microsoft.EntityFrameworkCore;

namespace WashitApi.Models
{
    public class WaitingListContext : DbContext
    {
        public WaitingListContext(DbContextOptions<WaitingListContext> options)
            : base(options)
        {
        }

        public DbSet<WaitingListEntry> WaitingList { get; set; } = null!;
    }
}
