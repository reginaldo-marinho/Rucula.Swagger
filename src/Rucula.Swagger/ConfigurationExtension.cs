
using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Rucula.Swagger;

public static class RequestCultureMiddlewareExtensions
{
    /// <summary>
    /// swagger support middleware
    /// </summary>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseRuculaUiSwagger(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RuculaUiMiddeware>();
    }
}

public static class ConfigurationExtension
{
    /// <summary>
    /// Configure static files for suport Swagger Ui
    /// </summary>
    /// <param name="option"></param>
    public static void InjectRuculaUi(this SwaggerUIOptions option)
    {
        option.InjectStylesheet("rucula.css");
        option.InjectJavascript("rucula.js","module");
    }
}
