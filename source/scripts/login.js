document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;

    // Exemplo simples de validação (substitua por autenticação real)
    if (username === "admin" && password === "admin") {
      // Redirecionar para a página principal
      window.location.href = "index.html";
    } else {
      alert("Usuário ou senha inválidos.");
    }
  });
});