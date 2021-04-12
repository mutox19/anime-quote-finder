
import { fetchWrapper } from '../_helpers/fetch_wrapper';
const baseURL = "https://animechan.vercel.app/api";

export const AnimeServices = {
    getRandomQuote,
    getTenRandomQuotes,
    getQuoteByTitle,
    getQuoteByCharacterName,
    getAvailableAnimeList,
}



function getRandomQuote(){
    return fetchWrapper.get(`${baseURL}+/`);
}
function getTenRandomQuotes(){
    return fetchWrapper.get(`${baseURL}/quotes`);
}
function getQuoteByTitle(title){
    return fetchWrapper.get(`${baseURL}/quotes/anime?title=${title}`);
}

function getQuoteByCharacterName(name){
    return fetchWrapper.get(`${baseURL}/quotes/character?name=${name}`);
}

function getAvailableAnimeList(){
    return fetchWrapper.get(`${baseURL}/available/anime`);
}
