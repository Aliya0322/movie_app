export {loadMovies};
import { displayMovieList } from "./main.js";

async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e15683b`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === "True") {
        displayMovieList(data.Search);
    } else {
        console.error("Фильмы не найдены");
    }
}