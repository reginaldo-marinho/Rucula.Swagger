using Rucula.Swagger;
using Sales;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseStaticFiles();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=> {
        c.InjectRuculaUi();
    });
    app.UseRuculaUiSwagger();
}


app.UseHttpsRedirection();

app.MapPost("/sale", (Sale sale) => { 

    var Sale = sale;
    
} );

app.MapPut("/sale", (Sale sale) => { 

    var Sale = sale;
    
} );

app.Run();

