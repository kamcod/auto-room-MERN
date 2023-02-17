const apiUrl = 'http://localhost:5000/api';
export const serverUrl = 'http://localhost:5000';


const AppConfig = {
    appUrl: 'http://localhost:3000',

    apis: {
        registerUser: `${apiUrl}/register`,
        loginUser: `${apiUrl}/login`,
        logoutUser: `${apiUrl}/logout`,
        getDashboardStats: `${apiUrl}/dashboard`,
    }
};
export default AppConfig;
