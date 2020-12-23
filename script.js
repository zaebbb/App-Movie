const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const image = document.querySelector("img");
const i = document.querySelector("i");

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML = "";

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
		    <img src="${movie.backdrop_path == null ? "./img/unnamed.svg" : IMGPATH + movie.backdrop_path}" class="${movie.backdrop_path == null ? "noImage" : "image"}">
		    <div class="movie-info">
			    <h3>${movie.original_title}</h3>
			    <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                ${movie.overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote >= 7.5){
        return "green";
    } else if(vote > 5){
        return "orange";
    } else if(vote <= 5){
        return "red";
    } 
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
})
i.addEventListener("click", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
})