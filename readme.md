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

## Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the project change log.

The commit message formatting can be added using a typical git workflow or through the use of a CLI wizard (Commitizen). To use the wizard, run npm run commit in your terminal after staging your changes in git.

## Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

*The header is mandatory and the scope of the header is optional.*

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

**feat:** A new feature

**fix:** A bug fix

**docs:** Documentation only changes

**style:** Changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc)

**refactor:** A code change that neither fixes a bug nor adds a feature

**perf:** A code change that improves performance

**test:** Adding missing tests

**chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...

### Subject

The subject contains succinct description of the change:

use the imperative, present tense: *"change" not "changed" nor "changes"*
don't capitalize first letter
no dot (.) at the end
### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.


[STOLEN](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md)
