const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");
const users = [];
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  users.push({ username, password });
  showMessage("Registration successful. You can now log in.", "success");
  registerForm.reset();
});
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    showMessage("Login successful. Redirecting to secured page...", "success");
    setTimeout(() => {
      window.location.href = "secured.html";
    }, 2000);
  } else {
    showMessage(
      "Login failed. Please check your credentials and try again.",
      "error"
    );
    loginForm.reset();
  }
});
function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(type);
  }, 3000);
}
