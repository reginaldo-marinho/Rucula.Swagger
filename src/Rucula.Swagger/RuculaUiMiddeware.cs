using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace Rucula.Swagger;

public class RuculaUiMiddeware
{
    /// <summary>
    /// Default File Name Javascript
    /// </summary>
    private const string StaticFileJs = "rucula.js";

    /// <summary>
    /// Default File Name Css
    /// </summary>
    private const string StaticFileCss = "rucula.css";

    private readonly RequestDelegate _next;
    public RuculaUiMiddeware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if(context.Request?.Path.Value is null)
        {
        await _next(context);
        }

        var match = Regex.Match(context.Request.Path.Value, @"\/swagger\/rucula.(js|css)");

        if(match.Success)
        {
            var ruculaStaticFile = context.Request.Path.Value.Replace("/swagger/","");

            if(ruculaStaticFile == StaticFileJs) 
            {
                context.Response.ContentType = "application/javascript;charset=utf-8";
            }

            if(ruculaStaticFile == StaticFileCss) 
            {
                context.Response.ContentType = "text/css";
            }
            
            var assembly = typeof(RuculaUiMiddeware).Assembly;
            
            var fileStream = assembly.GetManifestResourceStream($"Rucula.Swagger.{ruculaStaticFile}");

            if(fileStream is null)
            {
                throw new FileNotFoundException($"File {ruculaStaticFile} not found!");
            }

            using StreamReader sr = new(fileStream);
            string file = sr.ReadToEnd();
            await context.Response.WriteAsync(file);
        }

        await _next(context);
    }
}
