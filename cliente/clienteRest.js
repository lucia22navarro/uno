function ClienteRest(){
    this.agregarJugador = function(nick){
        $.getJSON("/agregarJugador/" + nick, function(data){
            //se ejecuta cuando conteste el servidor 
            console.log(data);
        })

        //el servidor sigue la ejecución sin esperar respuesta
        //mostrar una ruleta
    }
    this.crearPartida = function(nick,numJug){
        $.getJSON("/crearPartida/" + nick + "/" + numJug, function(data){
            //se ejecuta cuando conteste el servidor 
            console.log(data);
        })
    }

    //crear partida

    //unir a partida
    this.unirAPartida = function(codigo,nick){
        $.getJSON("/unirAPartida/" + codigo + "/" + nick, function(data){
            //se ejecuta cuando conteste el servidor 
            console.log(data);
        })
    }
    //obtener lista de partidas
    this.obtenerTodasPartidas = function(){
        $.getJSON("/obtenerTodasPartidas/", function(data){
            //se ejecuta cuando conteste el servidor 
            console.log(data);
        })
    }
}