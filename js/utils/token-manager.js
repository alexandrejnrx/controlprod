const TokenManager = {

    saveToken(token) {
        localStorage.setItem('authToken', token);
    },

    getToken() {
        return localStorage.getItem('authToken');
    },

    removeToken() {
        localStorage.removeItem('authToken');
    },

    hasToken() {
        return this.getToken() !== null;
    },

    getAuthHeader() {
        const token = this.getToken();
        return token ? `Bearer ${token}` : '';
    }
};