import Marionette from 'backbone.marionette';
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default Marionette.View.extend({
  template: _.template(`
    <form id="form-login">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <button type="button" id="logout" style="display:none;">Logout</button>
      <div id="mensaje"></div>
    </form>
  `),

  events: {
    'submit #form-login': 'onLogin',
    'click #logout': 'onLogout'
  },

  onLogin(e) {
    e.preventDefault();
    const email = this.$('#email').val();
    const password = this.$('#password').val();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        this.$('#mensaje').text(`Bienvenido ${userCredential.user.email}`);
        this.$('#logout').show();
      })
      .catch(err => {
        this.$('#mensaje').text(`Error: ${err.message}`);
      });
  },

  onLogout() {
    signOut(auth).then(() => {
      this.$('#mensaje').text('Sesión cerrada');
      this.$('#logout').hide();
    });
  }
});
