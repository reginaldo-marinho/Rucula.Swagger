<p align="center">
    <img src="https://github.com/user-attachments/assets/7da260e4-daa3-4efe-ba05-52412ac6dd73" style="width:200px;border-radius:10px">
    <h1 align="center">Rucula Swagger</h1>
   <p align="center">Converta dinamicamente seu end point de teste em uma nova interface</p>
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

## O que Faz?

Este projeto faz intermédio entre o usuário e a interface padrão do Swagger, o que garante que você use o padrão mesmo trabalhando com o RuculaUiSwagger
## Instalação

1. Adicione o pacote Nuget  [RuculaX.Swagger](https://www.nuget.org/packages/RuculaX.Swagger)
1. Adicione o middleware  `app.UseRuculaUiSwagger()`
1. Adicione à `UseSwaggerUI` a configuração  `InjectRuculaUi`

```c#
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=> {
        c.InjectRuculaUi(); 👈
    });
    app.UseRuculaUiSwagger(); 👈
}
```

Pronto! A partir de agora toda vez que você iniciar seu projeto com o Swagger configurado, o [RuculaX.Swagger](https://www.nuget.org/packages/RuculaX.Swagger) procurará pelos métodos `POST` e `PUT` e configurará a interface para você.

