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



