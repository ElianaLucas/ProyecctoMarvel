// VistaMisComics.js
import Marionette from 'backbone.marionette';
import { auth, db } from './firebase-config.js';
import { collection, query, where, getDocs } from "firebase/firestore";

export default Marionette.View.extend({
  template: _.template(`
    <h2>Mis Cómics Favoritos</h2>
    <ul id="lista-favoritos"></ul>
    <div id="mensaje"></div>
  `),

  onRender() {
    this.cargarFavoritos();
  },

  async cargarFavoritos() {
    const user = auth.currentUser;
    if (!user) {
      this.$('#mensaje').text('Debes iniciar sesión para ver tus favoritos.');
      return;
    }

    const favoritosRef = collection(db, "favoritos");
    const q = query(favoritosRef, where("userId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const lista = this.$('#lista-favoritos');
      lista.empty();

      querySnapshot.forEach(doc => {
        const data = doc.data();
        lista.append(`<li>${data.title} <img src="${data.thumbnail}" width="50"></li>`);
      });

      if (querySnapshot.empty) {
        this.$('#mensaje').text('No tienes favoritos aún.');
      } else {
        this.$('#mensaje').empty();
      }
    } catch (error) {
      this.$('#mensaje').text(`Error: ${error.message}`);
    }
  }
});
