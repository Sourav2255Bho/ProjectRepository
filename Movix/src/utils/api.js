import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmEwYjg5NjEwZmU5MDU2YzFiZTI0ZWEyNDBhNTY3MCIsInN1YiI6IjY2NTBmNDc3ZjdjZGM4NTVjYjU4N2M4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b-7E_kjwzFKt-rqQlfMj0idV4tktPm9LLIQemlt1q_Q";


const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (err){
        console.log(err)
        return err;
    }
}