document.addEventListener('DOMContentLoaded', function () {

    if (TokenManager.hasToken()) {
        window.location.href = 'pages/home.html';
        return;
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Preencha todos os campos!');
            return;
        }

        try {
            const response = await AuthService.login(username, password);

            TokenManager.saveToken(response.token);

            window.location.href = 'pages/home.html';

        } catch (error) {
            alert('Usuário ou senha inválidos!');
        }
    });
});