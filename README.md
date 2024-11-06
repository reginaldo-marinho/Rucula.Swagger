<p align="center">
    <img src="https://github.com/user-attachments/assets/7da260e4-daa3-4efe-ba05-52412ac6dd73" style="width:200px;border-radius:10px">
    <h1 align="center">Rucula Swagger</h1>
   <p align="center">converta dinamicamente seu end point de teste em uma nova interface</p>
</p>

<p align="center">
  <a href="https://circleci.com/gh/angular/workflows/angular/tree/main">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>&nbsp;
  <a href="https://www.nuget.org/packages/Rucula.Swagger/">
    <img src="https://img.shields.io/nuget/v/Rucula.Swagger" alt="Version RuculaX Entity Framewrok" />
  </a>&nbsp;
  <a href="https://github.com/reginaldo-marinho/Rucula.Swagger/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/reginaldo-marinho/Rucula.Swagger" alt="Discord conversation" />
  </a>
   <a href="https://github.com/reginaldo-marinho/Rucula.Swagger/commits/main">
    <img src="https://img.shields.io/github/last-commit/reginaldo-marinho/Rucula.Swagger" alt="Discord conversation" />
  </a>

   <a href="https://www.nuget.org/packages/Rucula.Swagger/">
    <img src="https://img.shields.io/nuget/dt/Rucula.Swagger" alt="Discord conversation" />
  </a>
</p>

## Instalação

- Adicione o pacote nuget  `dotnet add package RuculaX.Swagger`
- Adicione o middleware  `app.UseRuculaUiSwagger()`

Use o método de extensão `InjectRuculaUi` dentro de `UseSwaggerUI`, para linkar os arquivos estáticos `rucula.js` e `rucula.css`

```c#
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=> {
        c.InjectRuculaUi();
    });
    app.UseRuculaUiSwagger();
}
```