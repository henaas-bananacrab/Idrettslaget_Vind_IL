import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export const userApi = {
    login: (username, password) => api.post('/auth/login', { username, password }),
    register: (username, password, role) => api.post('/auth/register', { username, password, role }),
};

export const teamApi = {
    getAllTeams: () => api.get('/teams'),
    createTeam: (name) => api.post('/teams', { team_name: name }),
    deleteTeam: (teamId) => api.delete(`/teams/${teamId}`),
};

export const playerApi = {
    createPlayer: (name, teamId) => api.post('/players', { player_name: name, team_id: teamId }),
    getPlayersByTeam: (teamId) => api.get(`/teams/${teamId}/players`),
    deletePlayer: (playerId) => api.delete(`/players/${playerId}`),
};

export const matchApi = {
    fetchAllMatches: () => api.get('/matches'),
    fetchMatchById: (matchId) => api.get(`/matches/${matchId}`),
    createMatch: ({ team_id_1, team_id_2, time, result }) =>
        api.post('/matches', { team_id_1, team_id_2, time, result: result || null }),
    updateMatchResult: (matchId, result) => api.put(`/matches/${matchId}`, { result }),
    deleteMatch: (matchId) => api.delete(`/matches/${matchId}`),
};

export default api;