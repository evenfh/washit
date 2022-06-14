using Microsoft.EntityFrameworkCore;
using WashitApi.Models;
using WashitApi.Services;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddDbContext<ReservationContext>(opt =>
    opt.UseInMemoryDatabase("Reservations"));

builder.Services.AddDbContext<WaitingListContext>(opt =>
    opt.UseInMemoryDatabase("WaitingList"));

builder.Services.AddTransient<IReservationService, ReservationService>();
builder.Services.AddTransient<IWaitingListService, WaitingListService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.UseWebSockets(webSocketOptions);

app.Run();
