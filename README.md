# Inventarios

[![Maintainability](https://api.codeclimate.com/v1/badges/652dd28aca86a7a315bb/maintainability)](https://codeclimate.com/github/ProyectoIntegrador2018/Inventarios/maintainability)

Aplicación web para llevar el control del inventario de dispositivos del departamento de Computación

## Tabla de contenidos

* [Detalles del cliente](#detalles-del-cliente)
* [URLS del ambiente](#urls-del-ambiente)
* [Equipo](#equipo)
* [Stack Tecnológico](#stack-tecnológico)
* [Herramientas administrativas](#herramientas-administrativas)
* [Configurar el proyecto](#configurar-el-proyecto)
* [Correr el stack para desarrollo](#correr-el-stack-para-desarrollo)
* [Detener proyecto](#detener-proyecto)
* [Restaurar base de datos](#restaurar-base-de-datos)
* [Depuración(Debbuging)](#depuración)
* [Especificaciones para correr proyecto](#especificaciones-para-correr-proyecto)
* [Checar código para problemas potenciales](#checar-código-para-problemas-potenciales)


### Detalles del cliente

| Nombre                      | Email             | Role                                      |
| --------------------------- | ----------------- | ----------------------------------------- |
| Armandina Juana Leal Flores | aleal@tec.mx      | Directora del Departamento de Computación |


### URLS del ambiente

* **Producción** - [Heroku](http://inventariosdecomputacion.herokuapp.com/)
* **Desarrollo** - [Github](https://github.com/ProyectoIntegrador2018/Inventarios)

### Equipo

| Nombre            | Email                          | Role        |
| ----------------- | ------------------------------ | ----------- |
| Miguel Banda      | miguelangelbandardz@gmail.com  | Development |
| Abelardo Gonzalez | abelardo_gonzalezg@hotmail.com | Development |
| Luis Rojo         | luis_alfonso_96@hotmail.com    | Development |
| Guillermo Mendoza | ams.guillermo@gmail.com        | Development |

### Stack Tecnológico

* [PHP] - Versión 7.1.23
* [Laravel] - Versión 5.7.26
* [PostgreSQL] - Versión 11.1
* [Laravel Excel](https://github.com/Maatwebsite/Laravel-Excel) - Versión 3.1 (Utilizando la herramienta de Composer para instalarlo y actualizarlo)
* [Ziggy](https://github.com/tightenco/ziggy)

### Herramientas administrativas

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/Inventarios)
* [Backlog](linktobacklog)
* [Heroku](https://crowdfront-staging.herokuapp.com/)
* [Documentation](linktodocumentation)

## Desarrollo

### Configurar el proyecto

Para el desarollo local del proyecto es necesario instalar [`Composer`](https://getcomposer.org/), el cual es un manejador de dependencias de PHP el cual nos servirá para el manejo de la aplicación en cuestión de instalación y actualización de paquetes del proyecto. Igualmente es necesario tener instalado [`PostgreSQL`](https://www.postgresql.org/) para manejar la base de datos.

1. Clonar este repositorio en tu equipo:

```bash
$ git clone https://github.com/ProyectoIntegrador2018/Inventarios.git
```

2. En caso de ser necesario, crear un nuevo archivo .env para realizar pruebas locales específicas
```
cp .env.example .env
```

3. Instalar y/o actualizar dependencias de ser requerido

```bash
$ composer install
$ composer update
```

4. Generar llave del proyecto

```
$ php artisan key:generate
```

5. Crear la base de datos en PostgreSQL
```
Crear una base de datos con el nombre de 'inventarios'
```

6. Migrar la base de datos

```
$ php artisan migrate
```

### Correr el stack para desarrollo

1. Correr en la terminal

```
$ php artisan serve
```
