// Importo axios 
import axios from "axios";

const API_URL = 'http://localhost:3333';

// creo un'istanza con axios con baseURL 
const api = axios.create({ baseURL: API_URL });

// Funzione per ottenere politici

export const getPoliticians = () => {
    return api.get('/politicians')
};