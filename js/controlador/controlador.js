/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo
}

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas)
  },
  borrarPregunta: function (id) {
    this.modelo.borrarPregunta(id)
  },
  resetPreguntas: function (){
    this.modelo.resetPreguntas()
  },

}
