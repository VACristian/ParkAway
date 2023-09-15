using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using ParkAwayServer.Models;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddAuthorization();


builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;


});


builder.Services.AddCors(options =>
{
  options.AddPolicy("corspolicy",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
                          builder.WithOrigins("http://192.168.1.244:4200").AllowAnyMethod().AllowAnyHeader();
                      });
});



builder.Services.AddControllers();

#region Identity

builder.Services.AddDbContext<ParkContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection")));
builder.Services.AddIdentity<Users, IdentityRole>().AddEntityFrameworkStores<ParkContext>();

#endregion


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

app.UseCors("corspolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

app.UseMvc();




