Marvel.Views = Marvel.Views || {};

Marvel.Views.VistaComic = Marionette.View.extend({
  tagName: 'div',
  className: 'item-comic',
  template: '#VistaComicTmpl',

  events: {
    'click .ver-detalles': 'verDetalles'
  },

  verDetalles: function(e) {
    e.preventDefault();
    this.triggerMethod('show:details', this.model);
  }
});
