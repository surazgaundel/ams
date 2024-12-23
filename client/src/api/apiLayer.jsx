import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// authentication 
export const login = (email, password) => api.post('/auth/login', {email,password});
export const signup = (customerData) => api.post('/auth/signup', customerData);

// user 
export const getUsers =(page, limit)=>api.get(`/users`, { params: { page, limit }});
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, updateUserData) => api.put(`/users/${id}`, updateUserData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// artist
export const getArtists = (page, limit) => api.get(`/artists`, { params: {page,limit}});
export const createArtist = (artistData) => api.post("/artists", artistData);
export const updateArtist = (id, updatedArtistData) => api.put(`/artists/${id}`, updatedArtistData);
export const deleteArtist = (id) => api.delete(`/artists/${id}`);
export const importArtists = (csvFile) => {
    const formData = new FormData();
    formData.append("file", csvFile);
    return api.post("/artists/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const exportArtists = () => api.get("/artists/export", { responseType: "blob" });
export const getMusicsByArtist = (artistId) => api.get(`/artists/${artistId}`);

// Song APIs
export const getMusics = (page,limit) =>api.get(`/musics`,{params:{page,limit}});
export const createMusic = (artistId, musicData) => api.post(`/musics?artistId=${artistId}`, musicData);
export const updateMusic = (songId, updatedMusicData) => api.put(`/musics/${songId}`, updatedMusicData);
export const deleteMusic = (songId) => api.delete(`/musics/${songId}`);

export default api;