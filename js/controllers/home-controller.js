document.addEventListener('DOMContentLoaded', function() {

    if (!TokenManager.hasToken()) {
        alert('Você precisa fazer login!');
        window.location.href = '../index.html';
        return;
    }

    console.log('Usuário autenticado!');
});

function logout() {
    if (confirm('Deseja sair?')) {
        AuthService.logout();
    }
}