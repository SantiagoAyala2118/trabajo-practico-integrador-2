# trabajo-practico-integrador-2 CRUD con MONGOOSE

### **Como inicializar el proyecto:**

1. Clonar el repositorio mediante el método que otorga _GitHub_ en una carpeta de su computadora.
2. Una vez abierta la carpeta, en la terminal se debe ejecutar el comando **npm i** para descargar todas las dependencias utilizadas en el mismo, y así no tener problemas de importación cuando se quiera correr el proyecto.
3. Luego de descargar todas las dependencias, se tiene que realizar una copia del archivo **_.env.example_** y renombrarlo a **_.env_**, para así configurar las variables de entorno que están especificadas en el archivo mismo.
4. Una vez configurada las variables, se procede a conectarse con la base de datos en **_MongoDb_**, recordando siempre que esta debe tener el mismo nombre que la especificada en las variables de entorno.
5. Tras esto, se procede con el comando **npm run dev**. Y de esta forma el proyecto ya debería estar corriendo en el servidor con el puerto especificado en las variables de entorno, y debería ser capaz de recibir consultas y entregar respuestas de forma satisfactoria.

### Elección de por qué **_documentos embebidos_** y por qué **_referenciados_**
- ### Documento embebido:
En el modelo de **Usuario**, se optó porque el campo _profile_ sea un **documento embebido** porque se consideró que ese campo, si bien puede existir por si solo, es mejor que esté directamente "relacionado" con el uuario creado, ya que también va a ser más comodo a la hora de hacer consultas. Además, nos aseguramos de que cada usuario tenga su propio perfil asociado, y que éste contenga sus características ingresadas a la hora del registro.

#### _Ventajas_
- A la hora de hacer las consultas, con una ya es suficiente para traer todos los datos.
- Se logra un mejor rendimiento para los datos relacionados.
#### _Desventajas_
- Puede que en algún momento el documento crezca demasiado.
- Se complica a la hora de consultar de forma independiente los subdocumetos.
- 
- ### Documentos referenciados:
Esta forma de "relacionar" documentos se implementó entre los esquemas de **_Article_** y **_User_** (_campo author_) **_Article_** y **_Tag_** (_campo tags_) **_Comment_** y **_User_** (_campo author_) y por ultimo **_Comment_** y **_Article_** (_campo article_). Se optó por esta forma, ya que principalmente cada esquema o modelo, puede "existir" sin la necesidad del otro (al menos gracias a mongo), puede actualizarse sin necesidad del otro, los campos son diferentes por lo que no es conveniente almacenarlos todos dentro de un documento embebido, entre otras cosas.

#### _Ventajas_
- Se evitan datos dupliados.
- Facilita las consultas independientes
- Es mejor para las "relaciones" más complejas
#### _Desventajas_
- Es más complicado hacer consultas dificiles, como ser joins.
- Hay riesgos de datos rotos, ya que Mongo no te avisa de errores de referencia.
- Es más complejo de mantener

### **Ejemplos de request/response de los endpoints**
#### ***_USERS/AUTH_***
**MÉTODO POST:**
- El usuario al momento de registrarse en el sistema, enviará una request (consulta) al siguiente endpoint: ***http://localhost:4100/api/auth/users***, un documento tal que así:
```javascript
{
    "username":"santiago",
    "email":"santiago@gmail.com", 
    "password":"123123", 
    "role":"user", 
    "profile":{
        "firstName":"Santi",
        "lastName":"Ayala"
        "...":"..."  //<----- Resto de información solicitada en el esquema
    }
}
```
Y el servidor responderá de la siguiente manera:
```javascript
{
    "message": "User created",
    "User": {
        "username": "santiago",
        "email": "santiago@gmail.com",
        "password": "$2b$10$laUPDgSuG4BnlL/NmECCFOHLqVss.T1..TNVQ3PwWYMxJ2ty8hrUG", //<---- Contraseña hasheada
        "role": "user",
        "profile": {
            "firstName": "Santi",
            "lastName": "Ayala"
        },
        "deletedAt": null, //<----- Campo que dice si el usuario está o no eliminado (en un comienzo siempre null)
        "_id": "68d449f88c763ae976120ae1",
        "id": "68d449f88c763ae976120ae1"
    }
}
```
- Luego del registro, para loguearse el usuario enviará solamente ciertos datos para comparar en la base de datos al siguiente endpoint: ***http://localhost:4100/api/auth/login***
```javascript
{
    "username":"santiago",
    "password":"123123"
}
```
Al momento de recibir la solicitud, el servidor realiza una comparación donde busca en la BD un usuario con ese nombre, y a su vez una contraseña que al ser hasheada, tenga el mismo resultado. En dado caso de dar con ese usuario, el sistema arrojará el siguiente mensaje:
```javascript
{
    ok: true,
    message: "Loggin succesfuly",
}

//caso contrario:
{
    ok: false,
    message: "Username or password incorrect",
}
```
- Una vez logueado, el usuario tiene acceso al resto de endpoints del sistema, aunque eso tambien depende de los permisos y roles que maneje. Como el usuario ya está autenticado, ahora tiene acceso al endpoint para desloguearse: ***http://localhost:4100/api/auth/logout***
Este endpoint solo hace una consulta para borrar la cookie con los datos del usuario, en caso de exito muestra las siguientes respuestas:
```javascript
{
    ok: true,
    message: "Logout succesfuly",
}
``` 
- Para traer o actualizar el perfil del usuario logueado se utilizan los mismos endpoints: ***http://localhost:4100/api/auth/profile***
En el caso de traer el perfil se utiliza el **MÉTODO GET** y solo se evalúa el id del usuario logueado.
Por el otro lado, para actualizar el perfil se utiliza el **MÉTODO PUT** y se reciben los siguientes valores:
```javascript
{
    "profile": {
    "firstName": "Santiago",
    "lastName": "Ayala",
    "biography": "Un estudidante de la Tecnicatura Superior en Desarrollo de Software Multiplataforma", 
    "avatarUrl":"https://avatar_url",
    "birthDate":"21/01/07"
    }
}
```
En caso de enviar datos válidos y que no salten las validaciones, el servidor enviará un mensaje como:
```javascript
{
    ok: true,
    message: "Profile updated",
}
```
- A su vez, hay otros endpoints que permiten otras interacciones con los usuario, como ser: ***http://localhost:4100/api/users***. Este utiliza el **MÉTODO GET** y lo único que hace es listar los usuarios con sus articulos, arrojando una respuesta tal que así:
```javascript
{
    {
    "username":"Santiago"
    "email": "satiago@gmail.com",
    "role": "user",
    "profile": {
      "firstName": "Santiago",
      "lastName": "Ayala",
      "biography": "Un estudidante de la Tecnicatura Superior en Desarrollo de Software Multiplataforma", 
      "avatarUrl":"https://avatar_url",
      "birthDate":"21/01/07"
    },
    "deletedAt": null,
    "articles":["_id 1","_id 2"...]//<--- Los articulos que pertenecen a ese usuario
  },
}
```
- El siguiente endpoint también utiliza el **MÉTODO GET**, sin embargo éste recibe un id por el parámetro, tal que así: ***http://localhost:4100/api/users/:id***. Este trae un solo usuario, con la diferencia de que además, este incluye los comentarios ligados, además del artículo, dando una respuesta como la siguiente:
```javascript
{
    {
    "username":"Santiago"
    "email": "satiago@gmail.com",
    "role": "user",
    "profile": {
      "firstName": "Santiago",
      "lastName": "Ayala",
      "biography": "Un estudidante de la Tecnicatura Superior en Desarrollo de Software Multiplataforma", 
      "avatarUrl":"https://avatar_url",
      "birthDate":"21/01/07"
    },
    "deletedAt": null,
    "articles":["_id 1","_id 2"...], //<--- Los articulos que pertenecen a ese usuario
    "comments":["_id 1","_id 2"...], //<--- Los commentarios que pertenecen a ese usuario
  },
}
```
> Cabe recalcar que estos campos, al no estar ligados al usuario o pertenecer a un campo en específico, es necesario emplear el VIRTUAL para lograr hacer un "populate inverso" y traer esos campos.

- Los siguientes endpoints utilizan todos el mismo modelo que el anterior, recibiendo un id por parámetros. No obstante, estos realizan acciones diferentes:
Uno utiliza el **METODO PUT** para actualizar un usuario, esperando una request tal que así:
```javascript
{
    {
        "username":"Tomás" //<--- Se cambió el nombre
        "email": "satiago@gmail.com",
        "password":"123123"
        "role": "user",
        "profile": {
            "firstName": "Santiago",
            "lastName": "Ayala",
            "biography": "Un estudidante de la Tecnicatura Superior en Desarrollo de Software Multiplataforma", 
            "avatarUrl":"https://avatar_url",
            "birthDate":"21/01/07"
        },
        "deletedAt": null,
        "articles":["_id 1","_id 2"...], //<--- Los articulos que pertenecen a ese usuario
        "comments":["_id 1","_id 2"...], //<--- Los commentarios que pertenecen a ese usuario
    }
},
```
> En este sistema y caso, el usuario puede cambiar cualquier campo que quiera (y tampoco es necesario mandar todos los campos, es posible  mandar solo los deseados), siempre y cuando cumpla con las validaciones. 
Y enviará una respuesta parecida a la siguiente: 
```javascript
{   ok: true,
    message: "User updated",
    user: updateUser, //<--- Se envía el usuario actualizado
}
```
- Luego está el endpoint para borrar que utiliza el **MÉTODO DELETE** y lo único que hace una vez recibe el id por el parámetro, como se ve a continuación: _http://localhost:4100/api/users/60b4a85f3b2e4c0f7d8a9b1c_ es preguntar si existe algun documento en la base de datos con ese id que no esté ya borrado (recordando que los usuarios son de eliminación lóigica). 
> Cabe recalcar que este modelo de consulta a través de los parámetros es el mismo para todos los endpoints que requiean un id, Lo único que cambiaría sería el parámetro "users" por el que se esté haciendo referencia en ese momento, por ejemplo "articles".
Una vez haya encontrado un usuario con ese id, mandará la siguiente respuesta: 
```javascript
{
    ok: true,
    message: "User deleted",
}
```
Caso contrario (para la mayoría de bpusquedas que no den con el id):
```javascript
{
    ok:false,
    message:"User not found",
}
```
#### ***_ARTICLES_***
Para este modelo se implementó un _CRUD_ completo, más otros pequeños detalles correspondientes a la autorización de los usuarios.
- El primer endpoint, como el de todos, utiliza el **MÉTODO POST** y se envía una solicitud a _http://localhost:4100/api/articles_ con el siguiente formato: 
```javascript
{
    "title": "ACCIDENTE EN LA RUTA NACIONAL N°2",
    "content": "Un siniestro se produjo en la Ruta Nacional N°2 rondnado las 4 de la madrugada...",
    "excerpt": "Un camión que transportaba leña embistió a...",
    "status": "published",
    "author": "60b4a85f3b2e4c0f7d8a9b1c",//<--- id del usuario que lo creó
    "tags": ["60b4a84h3b2e4c05ud8a9b1g"], //<--- arreglo donde van los id's que refrencian a las etiquetas
},
```

Y enviará una respuesta tal como:
```javascript
{
    ok: true,
    message: "Article created",
    Article: article,
}
```
- El siguiente endpoint es exactamente igual al anterior, solo que este utiliza el **MÉTODO GET** para listar todos los artículos presentes en la base de datos. Y arroja una respuesta más o menos como esta:
```javascript
{
    "title": "ACCIDENTE EN LA RUTA NACIONAL N°2",
    "content": "Un siniestro se produjo en la Ruta Nacional N°2 rondnado las 4 de la madrugada...",
    "excerpt": "Un camión que transportaba leña embistió a...",
    "status": "published",
    "author":{
        "_id":"60b4a85f3b2e4c0f7d8a9b1c",
        "username":"Santiago"
        "email": "satiago@gmail.com",
        "role": "user",
        "profile": {
            "firstName": "Santiago",
            "lastName": "Ayala",
            "biography": "Un estudidante de la Tecnicatura Superior en Desarrollo de Software Multiplataforma", 
            "avatarUrl":"https://avatar_url",
            "birthDate":"21/01/07"
        },
        "deletedAt": null,
    }
    "tags": [
        {
            "_id":"60b4a84h3b2e4c05ud8a9b1g",
            "name":"Urgente",
            "description":"Es algo demasiado importante"
        }
    ] 
},
```
> Como se aprecia, en esta consulta trae todos los campos tanto del usuario (author) como de las etiquetas (tags).
- El siguiente endpoint se diferencia del resto principalmente en su forma de finalizar, ya que no recibe por parámetros ningún id ni nada: _http://localhost:4100/api/articles/my_. Y este lo que hace es consultar a la base de datos algún articulo que coincida con el id del usuario logueado. Arrojando una respuesta igual a la anterior, con la unica diferencia de que este trae solo los asociados con el usuario logueado.
- Luego están los endpoints que reciben por parámetros los id's de los artículos, y son todos iguales entre sí, siguiendo este formato: _http://localhost:4100/api/articles/:id_. Lo único que cada uno utiliza un método diferente.
- Está el que usa el **MÉTODO GET** que trae solamente el artículo especificado.
- Está el que usa el **MÉTODO PUT** que actualiza el artículo específicado, esperando una petición como la siguiente: 
```javascript
{
    "title": "ACCIDENTE EN LA RUTA NACIONAL N°2",
    "content": "Un siniestro se produjo en la Ruta Nacional N°2 rondnado las 4 de la madrugada...",
    "excerpt": "Un camión que transportaba leña embistió a...",
    "status": "archived", //<--- pasó de estar publicado a archivado
    "tags": ["60b4a84h3b2e4c05ud8a9b1g"],
},
```  
Y enviará una respuesta como la siguiente en caso de que haya salido todo bien:
```javascript
{   
    ok: true,
    message: "Article updated",
    Article: updatedArticle,
}
```
- Está el que usa el **MÉTODO DELETE** que elimina un articulo dependiendo del id enviado por parámetro.

### ***_TAGS_***
- En este caso también se optó por un _CRUD_ completo, contando con los 4 endpoints básicos:
- El que utiliza el **MÉTODO POST**: _http://localhost:4100/api/tags_, el cual espera una request tal que así:
```javascript
{
    "name":"Deportes",
    "description":"El artículo hace referencia o menciona a cualquier deporte"
}
```
Y arroja una respuesta como la siguiente:
```javascript
{
    ok: true,
    message: "Tag created",
    Tag: tag,
}
```
-Está el **MÉTODO GET**, el cuál usa el endpoint anterior y lo único que hace es mostrar un listado de todas las etiquetas existentes hasta el momento:
```javascript
      ok: true,
      message: "Tags founded",
      Tags: [
        {
            "name":"Deportes",
            "description":"El artículo hace referencia o menciona a cualquier deporte"
        },
        {
            "name":"Anime",
            "description":"El artículo habla o menciona a series de anime"
        },
        {
            "...":"..."
        }
      ],
```
También está el otro que utiliza el mismo método pero recibe un id por parámetros, trayendo solo el artículo solicitado.
> Este endpoint ya no trae un arreglo de tags, sino un solo objeto.

- Está el endpoint que usa el **MÉTODO PUT** que también recibe un id por parámetros se encarga de actualizar la etiqueta solicitada. Esta ruta espera una consulta parecida a la del **MÉTODO POST**:
```javascript
{
    "name":"Juegos",
    "description":"El artículo trata sobre juegos de cualquier tipo"
}
```
Enviando una respuesta como la siguiente en caso de ningún inconveniente: 
```javascript
{
    ok: true,
    message: "Tag updated",
    Tag: updateTag,
}
```
- Está por ultimo el **MÉTODO DELETE** el cuál se encarga de eliminar el artículo recibido por el id en los parámetro de la consulta. Y este arroja un mensaje como el que se muestra, una vez que el artículo haya sido borrado efectivamente:
```javascript
{
    ok: true,
    message: "Tag deleted",
    Tag: deleteTag,
}
```

### ***_COMMENTS_***
Para el modelo de comentarios se utilizó de igual forma un _CRUD_ completo sin nada raro. Por lo que se cuenta con los 4 endpoints básicos.
- Como en los modelos anteriores, se encuentra el **MÉTODO POST**: _http://localhost:4100/api/comments_ el cual espera una petición algo así:
```javascript
{
    "content": "Muy bueno tu artículo",
    "author": "60b4a85f3b2e4c0f7d8a9b1c", //<--- usuario que hizo el comentario
    "article": "6er4a85f3b2e4c0f7d4h2j3f", //<--- artículo al que se refiere
  },
```
Una vez que todo salga bien, se envía una respuesta tal que:
```javascript
{
    ok: true,
    message: "Comment created",
    comment: newComment,
}
```
> Cabe recalcar en este punto, que en el campo que referencia al modelo creado (en este caso comment) se está pasando la forma en la que se ve el modelo creado, que e practicamente lo mismo que cuando le pasas los valores, po lo que no se cree necesario mostrarlo (a no ser que sea realmente necesario).

- También está el endpoint que utiliza el **MÉTODO GET**, y este método lo comparten los endpoints que traen tanto el listado de los comentarios como un solo comentario ligado al usuario logueado. La respuesta que esperan es bastante similar, tanto entre sí como con la anterior mostrada, por lo que no se considera necesario mostrar el response por parte del servidor.

- El **MÉTODO PUT** es el que se utiliza para actualizar un comentario, nuevamente recibe un id por parámetro y espera la siguiente entrada:
```javascript
{
    "content": "Muy malo tu artículo", //<--- se cambió el contenido del comentario
    "author": "60b4a85f3b2e4c0f7d8a9b1c", 
    "article": "6er4a85f3b2e4c0f7d4h2j3f", 
},
```
Y envía un response como este:
```javascript
{
    ok: true,
    message: "Comment updated",
    Comment: updatedComment,
}
```
-Continuando con el **MÉTODO DELETE**, como ya vimos, este es el responsable de eliminar el documento,que en este caso es el comentario. Recibe un id por parámetro y arroja una respuesta como la siguiente en caso de que todo haya ido bien:
```javascript
{
    ok: true,
    message: "Comment deleted",
    Comment: deletedComment,
}
```
### ***_ARTICLE_TAG_***
- Por último tenemos el los endpoints que representan la relación de muchos a muchos en nuestro sistema. Este grupo consta de dos endpoints con la misma estructura pero con métodos diferentes: _http://localhost:4100/api/articles/:articleId/tags/:tagId_

- En primer lugar tenemos al **MÉTODO POST** que consiste en crear un tipo de relación entre un artículo y una etiqueta. Esto mandando el id de ambios dentro de los parámetros de la ruta. Por ejemplo: _http://localhost:4100/api/articles/6er4a85f3b2e4c0f7d4h2j3f/tags/60b4a84h3b2e4c05ud8a9b1g_
> En este caso, al enviar toda la info requerida por los parámetros, no es necesario enviar nada por el body.
Esto nos daría una respuesta como la siguiente:
```json
{
    ok: true,
    message: "Tag added to article succesfuly",
    Article: newArticleTag,
}
```
> Lo que sucede detrás es que a un artículo con el id pasado por parámetros, se le está asignando una nueva etiqueta en el arreglo que las referencia.
- Por último, está el endpoint que utiliza el **MÉTODO DELETE**. Éste es el encargado de remover las etiquetas de los articulos y requiere los mismos parámetros que el endpoint anterior. Y devuelve una respuesta como esta:
```json
{
    ok: true,
    message: "Tag succesfuly removed from de article",
    ArticleTag: deleteArticleTag,
}
```
> Del mismo modo, lo que sucede por detrás es que a un artículo, se le está quitando, borrando, extrayendo, etc. una etiqueta del arreglo que las referencia.