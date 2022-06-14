using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WashitApi.Models;
using WashitApi.Services;

namespace WashitApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaitingListController : ControllerBase
    {
        private readonly IWaitingListService _waitingListService;

        public WaitingListController(IWaitingListService waitingListService)
        {
            _waitingListService = waitingListService;
        }

        [HttpGet("check-availability/{id}")]
        public MachineAvailability Get(string id)
        {

            return _waitingListService.CheckAvailability(id);
        }

        [HttpPost]
        public string Post([FromBody] WaitingListEntry waitingListEntry)
        {
            return _waitingListService.AddToWaitingList(waitingListEntry);
        }
    }
}
