using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace WashitApi.Models
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options)
        {
        }

        public DbSet<Reservation> Reservations { get; set; } = null!;
    }
}

