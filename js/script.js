const global = {
    currentPage: window.location.pathname
}

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

//Fetch data from API
async function fetchAPIData(endpoint) {
    const API_KEY = "29ad3a1037dafa02bc2c90b83f135326";
    const API_URL = "https://api.themoviedb.org/3/";

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=tr-TR`);
    const data = await response.json();

    return data;
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
            console.log("Home");
            displayPopularMovies();
            break;

        case "/shows.html":
            console.log("TV Shows");
            break;

        case "/movie-details.html":
            console.log("Movie Info");
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