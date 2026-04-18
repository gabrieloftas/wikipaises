import api from "./api";

const countryFields = "name,capital,region,population,flags,cca3";

export async function getAllCountries() {
    const response = await api.get(`/all?fields=${countryFields}`);
    return response.data;
}

export async function getRegion(region) {
    const response = await api.get(`/region/${region}?fields=${countryFields}`);
    return response.data;
}

export async function getCountryByName(name) {
    const response = await api.get(`/name/${name}?fields=${countryFields}`);
    return response.data;
}

export async function getAlpha3Code(alphaCode) {
    const response = await api.get(`/alpha/${alphaCode}?fields=${countryFields}`);
    return response.data;
}
