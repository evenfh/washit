using Microsoft.AspNetCore.Mvc;
using WashitApi.Models;
using WashitApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WashitApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public Dictionary<int, List<Reservation>> Get()
        {

            return _reservationService.GetAllReservations();
        }

        [HttpPost]
        public ActionResult<Reservation> Post([FromBody] Reservation reservation)
        {
            try
            {
                var reservationWithId = _reservationService.AddReservation(reservation);
                return new OkObjectResult(reservationWithId);
            }
            catch (ArgumentException)
            {
                return new ConflictResult();
            }
        }


        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _reservationService.DeleteReservation(id);
            return new OkResult();
        }
    }
}
