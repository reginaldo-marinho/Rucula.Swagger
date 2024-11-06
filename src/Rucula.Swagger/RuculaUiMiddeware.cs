using System.Reflection;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace Rucula.Swagger;

public class RuculaUiMiddeware
{
    private const string  StaticFileJs = "rucula.js";
    private const string StaticFileCss = "rucula.css";

    private readonly RequestDelegate _next;
    public RuculaUiMiddeware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var match = Regex.Match(context.Request.Path.Value, @"\/swagger\/rucula.(js|css)");

        if(match.Success)
        {
            var ruculaStaticFile = context.Request.Path.Value.Replace("/swagger/","");

            if(ruculaStaticFile == StaticFileJs) context.Response.ContentType = "application/javascript;charset=utf-8";
            if(ruculaStaticFile == StaticFileCss) context.Response.ContentType = "text/css";
            
            string pattern = @"\/[^\/]+\.dll$";

            var assembly = typeof(RuculaUiMiddeware).Assembly;
            
            var fileStream = assembly.GetManifestResourceStream($"Rucula.Swagger.{ruculaStaticFile}");

            using StreamReader sr = new(fileStream);
            string file = sr.ReadToEnd();

            await context.Response.WriteAsync(file);
        }

        await _next(context);
    }

}
