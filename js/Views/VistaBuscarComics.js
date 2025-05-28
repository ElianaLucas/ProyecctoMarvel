Marvel.Views.VistaBuscarComics = Marionette.View.extend({
  template: '#VistaBuscarComicsTmpl',

  events: {
    'click #botonBuscar': 'buscar'
  },

  initialize: function() {
    this.collection = new Marvel.Collections.Comics();
    this.listenTo(this.collection, 'sync', this.busquedaCompletada.bind(this));
  },

  buscar: function(e) {
    e.preventDefault();
    const texto = this.$('#textoBuscar').val().trim();
    if (texto) this.collection.buscar(texto);
  },

  busquedaCompletada: function() {
    this.triggerMethod('completed:search', this.collection);
  }
});
