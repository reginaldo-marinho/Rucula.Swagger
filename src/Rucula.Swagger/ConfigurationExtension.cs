
using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Rucula.Swagger;

public static class RequestCultureMiddlewareExtensions
{
    public static IApplicationBuilder UseRuculaUiSwagger(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RuculaUiMiddeware>();
    }
}

public static class ConfigurationExtension
{
    public static void InjectRuculaUi(this SwaggerUIOptions option)
    {
        option.InjectStylesheet("rucula.css");
        option.InjectJavascript("rucula.js","module");
    }
}
