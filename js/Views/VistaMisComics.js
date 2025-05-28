import Marionette from 'backbone.marionette';
import { auth, db } from './firebase-config.js';
import { collection, addDoc } from "firebase/firestore";

export default Marionette.View.extend({
  template: _.template(`
    <h2><%- title %></h2>
    <img src="<%- thumbnail %>" />
    <button id="btn-favorito">Agregar a Favoritos</button>
    <div id="mensaje"></div>
  `),

  events: {
    'click #btn-favorito': 'agregarAFavoritos'
  },

  agregarAFavoritos() {
    const user = auth.currentUser;
    if (!user) {
      this.$('#mensaje').text('Debes iniciar sesión para agregar favoritos.');
      return;
    }

    const comicData = {
      userId: user.uid,
      comicId: this.model.get('id'),
      title: this.model.get('title'),
      thumbnail: this.model.get('thumbnail')
    };

    addDoc(collection(db, "favoritos"), comicData)
      .then(() => {
        this.$('#mensaje').text('¡Agregado a favoritos!');
      })
      .catch(err => {
        this.$('#mensaje').text(`Error: ${err.message}`);
      });
  }
});
