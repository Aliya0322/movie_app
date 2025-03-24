export {loadMovieDetails};
import { displayMovieDetails, searchList, movieSearchBox } from "./main.js";

async function loadMovieDetails(movieId){
    searchList.classList.add('hide-search-list');
    movieSearchBox.value = "";
    const result = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e15683b`);
    const movieDetails = await result.json();
    displayMovieDetails(movieDetails);
}