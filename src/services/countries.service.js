import api from "./api";

export async function getAllCountries() {
    const response = await api.get("/all");
    return response.data;
}

export async function getRegion(region) {
    const response = await api.get(`/region/${region}`);
    return response.data;
}

export async function getCountryByName(name) {
    const response = await api.get(`/name/${name}`);
    return response.data;
}

export async function getAlpha3Code(alphaCode) {
    const response = await api.get(`/alpha/${alphaCode}`);
    return response.data;
}
