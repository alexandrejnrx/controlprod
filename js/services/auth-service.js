const AuthService = {

    async login(username, password) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        return await response.json();
    },

    logout() {
        TokenManager.removeToken();
        window.location.href = '../index.html';
    }
};