/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = []
  this.ultimoId = 0

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this)
  this.preguntaEliminada = new Evento(this)
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

  // se borra la pregunta correspondiente segun el id
  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id == !id)
    this.guardar()
    this.preguntaEliminada.notificar()
  },

  //se guardan las preguntas
  guardar: function () {}
}
