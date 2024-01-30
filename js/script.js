const global = {
    currentPage: window.location.pathname
}

//Display 20 Popular Movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData("/movie/popular");

    console.log(results);
    
    results.forEach(movie => {
        const popularMovieDiv = document.createElement("div");
        popularMovieDiv.classList.add("card");

        popularMovieDiv.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                ?
                `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />`
                :
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
            </div>`

        document.getElementById("popular-movies").appendChild(popularMovieDiv);
    })
}

//Display Movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split("=")[1];

    const movie = await fetchAPIData(`movie/${movieId}`);

    const div = document.createElement("div");
    

    div.innerHTML = `
    <div class="details-top">
        <div>
        ${
            movie.poster_path
            ?
            `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
            />`
            :
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
            />`
        }
        </div>
        <div>
        <h2>${movie.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${movie.genres.map(genre => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies.map(company => `<span>${company.name}</span>`).join(",  ")}</div>
    </div>`
    document.querySelector("#movie-details").appendChild(div);
}

//Add commas to number
function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Display 20 Popular Tv Shows
async function displayPopularShows() {
    const { results } = await fetchAPIData("/tv/popular");

    console.log(results);
    
    results.forEach(show => {
        const popularShowDiv = document.createElement("div");
        popularShowDiv.classList.add("card");

        popularShowDiv.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path
                ?
                `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`
                :
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
            </div>`

        document.getElementById("popular-shows").appendChild(popularShowDiv);
    })
}

//Fetch data from API
async function fetchAPIData(endpoint) {
    const API_KEY = "29ad3a1037dafa02bc2c90b83f135326";
    const API_URL = "https://api.themoviedb.org/3/";

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner();

    return data;
}

//Spiner actions
function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show");
}

//Higliht active category
function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(links => {
        if( links.getAttribute("href") === global.currentPage) {
            links.classList.add("active");
        }
    })
}

//Init function
function init() {
    switch (global.currentPage) {
        case "/":
        case "/index.html":
            displayPopularMovies();
            break;

        case "/shows.html":
            displayPopularShows();
            break;

        case "/movie-details.html":
            displayMovieDetails();
            break;

        case "/tv-details.html":
            console.log("TV Info");
            break;

        case "/search.html":
            console.log("Search Page");
            break;

        default:
            break;
    }

    highlightActiveLink();
}



init();