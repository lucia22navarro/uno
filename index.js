var fs = require("fs"); //librería para manejar el sistema de archivos
var express = require("express"); //middleware para implementar aplicaciones web
var app = express(); //creamos la instancia de express
var server = require("http").Server(app); //creamos el servidor http
var bodyParser = require("body-parser"); //parsear las peticiones de tipo POST
var modelo = require("./servidor/modelo.js");
var juego = new modelo.Juego();


app.set('port', process.env.PORT || 5000); //directiva de express que define una variable interna (port) donde va a escuchar nuestra aplicación
                                            //el segundo parámetro es el valor: o bien coge la variable de entorno o bien coge 5000
                                            //necesario para el despliegue en heroku
app.use(express.static(__dirname + "/")); //variable de entorno __dirname: nombre de toda la solución. en esta máquina: C:\lucia\proyectos\git\uno

app.get("/", function(request, response){ //cuando haya peticiones de tipo GET
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html"); //lee el fichero index.html de cliente
    response.setHeader("Content-type", "text/html");
    response.send(contenido);  //envía el contenido leído del fichero index.html
});

//agregar usuario
app.get("/agregarJugador/:nick", function(request, response){
    var nick = request.params.nick;    //leer el nick de la petición
    var res = juego.agregarJugador(nick);
    response.send(res);   //hay que enviar siempre una respuesta
});


//crear partida
app.get("/crearPartida/:nick/:numJug", function(request, response){
    var nick = request.params.nick;    //leer el nick de la petición
    var numJug = request.params.numJug;
    var ju1 = juego.usuarios[nick];
    var res={codigo:-1};
    if(ju1){
        var partida = ju1.crearPartida(numJug);
        res.codigo = ju1.codigoPartida;
    }
    response.send(res);   //hay que enviar siempre una respuesta
});

//unir a partida
app.get("/unirAPartida/:codigo/:nick", function(request, response){
    var nick = request.params.nick;    //leer el nick de la petición
    var codigo = request.params.codigo;
    var res = juego.unirAPartida(codigo, nick);
    response.send(res);   //hay que enviar siempre una respuesta
});

//obtener lista de partidas
app.get("/obtenerTodasPartidas", function(request, response){
    var res = juego.obtenerTodasPartidas(); //en res se guarda la lista de las partidas que devuelve el método de Juego
    response.send(res);   //hay que enviar siempre una respuesta
});

app.listen(app.get('port'), function(){    //lanzamos el servidor
    console.log("La app NodeJS se está ejecutando en el puerto ", app.get('port'));
});
