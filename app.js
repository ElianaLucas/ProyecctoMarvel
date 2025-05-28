// app.js: Inicializa la app y la vista global

$(function () {
  // Creamos la vista global
  const vistaGlobal = new Marvel.Views.VistaGlobal();
  // Insertamos la vista global en el body
  vistaGlobal.render().$el.appendTo('body');
});
