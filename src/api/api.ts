import axios from 'axios';
import { toast } from 'vue3-toastify';

export const getCompanyByName = async (name: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api?search=${name}`);
        return response.data;
    } catch (error) {
        toast.error("Une erreur est survenue lors de la récupération des données");
    }
}

export const getCompanies = async (page: number) => {
    const perPage = 12;
    const offset = (page - 1) * perPage;

    try {
    const response = await axios.get(`http://localhost:3000/api?perPage=${perPage}&offset=${offset}&search=`);
    return response.data
    } catch (error) {
        toast.error("Une erreur est survenue lors de la récupération des données");
    }
}

export const getTotalCompanies = async (name? : string) => {
    
    if(!name) {
        name = "";
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/total?name=${name}`);
        return response.data
    } catch (error) {
        toast.error("Une erreur est survenue lors de la récupération des données");
    }
}

export const getCompanyById = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/company?id=${id}`);
        return response.data;
    } catch (error) {
        toast.error("Une erreur est survenue lors de la récupération des données");
    }
}