# Bookmarks App (SERVER)
Aplicacion para almacenar y manejar marcadores por categorias.

La app fue creada utilizando Node, Express y Mongo; y en lugar de utilizar JS estamos utilizando Typescript para lograr un entorno de desarrollo mas amigable y rapido.

## Cosas que puede hacer

  * Crear marcadores y almacenarlos en la base de datos
  * Crear JWT para cada usuario a la hora de logearse
  * Solo trabajar sobre los marcadores de el usuario provisto en el JWT enviado al cliente
  * Debe enviarse un JWT valido en cada peticion
  * Correctos codigos HTTTP en cada respuesta
  * Misma estructura para errores y data devuelta del servidor
  * Crear y manejar usuarios
  * Buena Documentacion en las funciones

## Cosa por hacer
  * Completar la documentacion de la API
  * Diferenciar entre 'Perfil' y 'Usuario' para mayor seguridad
  * Crear punto de entrada para perfil
  * Administrar categorias creando su propia entidad en la DB
  * Aceptar **CORS**
  * Darle Formato a los mensajes de error
