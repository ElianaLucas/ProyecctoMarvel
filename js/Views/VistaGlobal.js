Marvel.Views.VistaGlobal = Marionette.View.extend({
  el: 'body',

  regions: {
    cabecera: '#cabecera',
    formBusqueda: '#formBusqueda',
    listado: '#listado'
  },

  childEvents: {
    'completed:search': function(child, col) {
      this.vistaLista = new Marvel.Views.VistaComics({ collection: col });
      this.showChildView('listado', this.vistaLista);
    },
    'show:details': function(child, model) {
      const detalles = new Marvel.Views.VistaDetallesComic({ model: model });
      this.getRegion('listado').show(detalles, { preventDestroy: true });
    },
    'hide:details': function() {
      this.showChildView('listado', this.vistaLista);
    }
  }
});
