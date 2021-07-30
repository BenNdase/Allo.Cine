import axios from "axios";

const apiKey = "8e75444d164c6753a09db0ea4696aae7";
const apiUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${apiUrl}/movie/now_playing`;
const topratedMoviesUrl = `${apiUrl}/movie/top_rated`;
const popularMoviesUrl = `${apiUrl}/movie/popular`;
const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming`;
const moviesUrl = `${apiUrl}/movie`;
const genreMovieUrl = `${apiUrl}/genre/movie/list`;
const discoverMoviesUrl = `${apiUrl}/discover/movie`;
export const posterUrl = 'https://image.tmdb.org/t/p/original/';

const popularSeries = `${apiUrl}/tv/popular`;
const seriesUrl = `${apiUrl}/tv`;
const genreSeriesUrl = `${apiUrl}/genre/tv/list`;
const nowPlayingSeriesUrl = `${apiUrl}/tv/now_playing`;
const discoverSeriesUrl = `${apiUrl}/discover/tv`;

const fetchMovies = async (movieUrl) => {
    try {
        const {data} = await axios.get(movieUrl, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:1
            }
        })
        
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['title'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
        
    } catch (error) {
        console.log(error)
    }
}
const fetchGenres = async (movieUrl) => {
    try {
        const {data} = await axios.get(movieUrl, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:1
            }
        })
        const modifiedData = data['genres'].map((resultData) => ({
            id: resultData['id'],
            name:resultData['name']
        }))
        return modifiedData;
        
    } catch (error) {
        console.log(error)
    }
}

export const fetchMoviesByGenres = async (currentPage,genreId) => {
    try {
        const {data} = await axios.get(discoverMoviesUrl, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:currentPage,
                with_genres:genreId
            }
        })
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['title'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        
        return modifiedData;
    } catch (error) {
        
    }
}
export const fetchSeriesByGenres = async (currentPage,genreId) => {
    try {
        const {data} = await axios.get(discoverSeriesUrl, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:currentPage,
                with_genres:genreId
            }
        })
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['name'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
    } catch (error) {
        
    }
}

export const movieDetailsList = async (id) => {
    try {
        const {data} = await axios.get(`${moviesUrl}/${id}`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });
        return data;
    } catch (error) {
        
    }
}

export const fetchQueryMovieSearch = async (titleMovie) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8e75444d164c6753a09db0ea4696aae7&language=en-US&query=${titleMovie}&page=1&include_adult=false`, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:1,
                query:titleMovie
            }
        })
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['title'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
    } catch (error) {
        
    }
}
export const fetchQuerySeriesSearch = async (titleMovie) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=8e75444d164c6753a09db0ea4696aae7&language=en-US&query=${titleMovie}&page=1&include_adult=false`, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:1,
                query:titleMovie
            }
        })
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['name'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
    } catch (error) {
        
    }
}

export const fetchCasts = async (id) => {
    try {
        const {data} = await axios.get(`${moviesUrl}/${id}/credits`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });
        const modifiedData = data['cast'].map((resultData) => ({
            id:resultData['cast_id'],
            character:resultData['character'],
            name:resultData['name'],
            image:resultData['profile_path'],
        }));
        return modifiedData;
    } catch (error) {
        
    }
}
export const fetchCastsSeries = async (id) => {
    try {
        const {data} = await axios.get(`${seriesUrl}/${id}/credits`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });
        const modifiedData = data['cast'].map((resultData) => ({
            id:resultData['cast_id'],
            character:resultData['character'],
            name:resultData['name'],
            image:resultData['profile_path'],
        }));
        return modifiedData;
    } catch (error) {
        
    }
}

export const fetchSimilarMovies = async (id) => {
   try {
        const {data} = await axios.get(`${moviesUrl}/${id}/similar`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        })
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['title'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
   } catch (error) {
       
   } 
}
export const fetchSimilarSeries = async (id) => {
    try {
         const {data} = await axios.get(`${seriesUrl}/${id}/similar`, {
             params:{
                 api_key:apiKey,
                 language:'fr'
             }
         })
         const modifiedData = data['results'].map((resultData) => ({
             id: resultData['id'],
             backPoster: posterUrl + resultData['backdrop_path'],
             popularity: resultData['popularith'],
             title: resultData['name'],
             poster: posterUrl + resultData['poster_path'],
             overview: resultData['overview'],
             rating: resultData['vote_average']
         }));
         return modifiedData;
    } catch (error) {
        
    } 
}

export const nowPlayingMovies = fetchMovies(nowPlayingUrl);
export const nowPlayingSeries = fetchMovies(nowPlayingSeriesUrl);
export const topratedMoviesList = fetchMovies(topratedMoviesUrl);  
export const popularMoviesList = fetchMovies(popularMoviesUrl);
export const upcomingMoviesList = fetchMovies(upcomingMoviesUrl);

export const genreMoviesList = fetchGenres(genreMovieUrl);
export const genreSeriesList = fetchGenres(genreSeriesUrl);



export const fetchPopularSeries = async () => {
    try {
        const {data} = await axios.get(popularSeries, {
            params:{
                api_key:apiKey,
                language:'fr',
                page:1
            }
        })
        
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            title: resultData['name'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
        
    } catch (error) {
        console.log(error)
    }
}
export const fetchSeriesDetails = async (id) => {
    try {
        const {data} = await axios.get(`${seriesUrl}/${id}`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });
        return data;
    } catch (error) {
        
    }
}
// export const fetchPopularSeries = fetchMovies(popularSeries);


export const fetchMoviesVideos = async (id) => {
    try {
        const {data} =  await axios.get(`${moviesUrl}/${id}/videos`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });

        return data['results'][0];
    } catch (error) {
        
    }
}
export const fetchSeriesVideos = async (id) => {
    try {
        const {data} =  await axios.get(`${seriesUrl}/${id}/videos`, {
            params:{
                api_key:apiKey,
                language:'fr'
            }
        });

        return data['results'][0];
    } catch (error) {
        
    }
}

export const RecoverDiscoverMovies = async () => {
    try {
        const {data} = await axios.get(discoverMoviesUrl, {
            params:{
                api_key:apiKey,
                language:'en_US',
                page:1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/'
        const modifiedData = data['results'].map((resultData) => ({
            id: resultData['id'],
            backPoster: posterUrl + resultData['backdrop_path'],
            popularity: resultData['popularith'],
            title: resultData['title'],
            poster: posterUrl + resultData['poster_path'],
            overview: resultData['overview'],
            rating: resultData['vote_average']
        }));
        return modifiedData;
    } catch (error) {
        
    }
}