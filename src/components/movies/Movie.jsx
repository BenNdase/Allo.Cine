import "./Movie.scss";
import { useState, useEffect } from "react";
import {
  genreMoviesList,
  nowPlayingMovies,
  fetchMoviesByGenres,
} from "../../service/api";
import CardMovies from "../card/Card";

const Movie = () => {
  const [genreMovies, setGenreMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      setGenreMovies(await genreMoviesList);
      setNowPlaying(await nowPlayingMovies);
      setMoviesByGenre(await fetchMoviesByGenres());
    };
    fetchApi();
    window.scroll(0, 0);
  }, []);

  const handleGenreClick = async (page, genreId) => {
    setMoviesByGenre(await fetchMoviesByGenres(page, genreId));
  };
  const disabledButton = (page) => {
    if (page <= 1) {
      return "d-none";
    }
  };

  const moviesGenreList = genreMovies.map((movie, index) => {
    return (
      <li className="list-inline-item pb-1" key={index}>
        <button
          type="button"
          className="btn btn-outline-info text-white"
          onClick={() => {
            handleGenreClick(currentPage, movie.id);
          }}
        >
          {movie.name}
        </button>
      </li>
    );
  });
  const nowPlayingMovieList = nowPlaying.slice(0, 1).map((movie, index) => {
    return (
      <div className="movies-background">
        <img src={movie.backPoster} alt={movie.title} key={index} />
      </div>
    );
  });
  const movieList = moviesByGenre.map((movie, index) => {
    return (
      <>
        <CardMovies
          className="container-card col-md-2 col-sm-3"
          text="Evaluation : "
          key={index}
          id={movie.id}
          poster={movie.poster}
          title={movie.title}
          rating={movie.rating}
          link="films"
        />
      </>
    );
  });
  return (
    <div className="movies-popular">
      <div className="container-movies">{nowPlayingMovieList}</div>
      <div>
        <div>
          <div className="row mt-3 container list-movies">
            <div className="col">
              <ul className="list-inline text-center">{moviesGenreList}</ul>
            </div>
          </div>
          <div className="container row">{movieList}</div>
        </div>
        <div className="text-center p-2">
          <button
            className={`btn btn-outline-info m-2 text-white ${disabledButton(
              currentPage
            )}`}
            onClick={() => {
              window.scroll(0, 0);
              handleGenreClick(currentPage - 1);
              setCurrentPage(currentPage - 1);
            }}
          >
            Précédent
          </button>
          <button className="btn bg-info text-white">Page {currentPage}</button>
          <button
            className="btn btn-outline-info m-2 text-white"
            onClick={() => {
              window.scroll(0, 0);
              handleGenreClick(currentPage + 1);
              setCurrentPage(currentPage + 1);
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};
export default Movie;
