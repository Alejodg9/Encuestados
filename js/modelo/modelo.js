/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = []
  this.ultimoId = 0

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this)
  this.preguntaEliminada = new Evento(this)
  this.preguntasReseteadas = new Evento(this)
  this.votoAgregado = new Evento(this)
  this.preguntaEditada = new Evento(this)

  var preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas"))
  if (preguntasGuardadas) {
    this.preguntas = preguntasGuardadas;
  }
}


Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var preguntas = this.preguntas
    this.ultimoId = preguntas != 0 ? preguntas[preguntas.length - 1].id : 0
    return this.ultimoId
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId()
    id++
    var nuevaPregunta = {
      textoPregunta: nombre,
      id: id,
      cantidadPorRespuesta: respuestas
    }
    this.preguntas.push(nuevaPregunta)
    this.guardar()
    this.preguntaAgregada.notificar()
  },

  //se guardan las preguntas
  guardar: function () {
    var stringPreguntas = JSON.stringify(this.preguntas);
    localStorage.setItem("preguntas", stringPreguntas)
  },

  // se borra la pregunta correspondiente segun el id
  borrarPregunta: function (id) {
    var preguntasFiltradas = this.preguntas.filter(pregunta => pregunta.id == !id)
    this.preguntas = preguntasFiltradas
    this.guardar()
    this.preguntaEliminada.notificar()
  },

  // se borran todas las preguntas
  resetPreguntas: function () {
    this.preguntas = []
    this.guardar()
    this.preguntasReseteadas.notificar()
  },

  agregarVoto: function (id, respuestaElegida) {
    var preguntaVotada = this.preguntas.find(pregunta => pregunta.id == id);
    var respuestaVotada = preguntaVotada.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == respuestaElegida);
    respuestaVotada.cantidad


    this.guardar()
    this.votoAgregado.notificar()
  },

  editarPregunta: function () {
    var preguntaEditada = this.preguntas.find(pregunta => pregunta.id == id)
    preguntaEditada.textoPregunta = nombre;
    preguntaEditada.cantidadPorRespuesta = respuestas;
    this.guardar()
    this.preguntaEditada.notificar()
  },

}
