import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login exitoso
        const user = userCredential.user;
        console.log("Usuario logueado:", user.email);
        window.location.href = "index.html"; // Redirige a la página principal de la app
      })
      .catch((error) => {
        console.error("Error de autenticación:", error.message);
        errorMessage.textContent = "Correo o contraseña incorrectos.";
      });
  });
});
