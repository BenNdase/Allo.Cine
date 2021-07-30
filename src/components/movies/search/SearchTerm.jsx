import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchQueryMovieSearch,
  nowPlayingMovies,
  posterUrl,
  fetchQuerySeriesSearch,
} from "../../../service/api";
import CardMovies from "../../card/Card";

const SearchTerm = () => {
  const [resultSearch, setResultSearch] = useState([]);
  const [resultSearchSeries, setResultSearchSeries] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/");
  const term = path[2];
  const imageUrl = posterUrl;

  useEffect(() => {
    const fetchApi = async () => {
      setResultSearch(await fetchQueryMovieSearch(term));
      setResultSearchSeries(await fetchQuerySeriesSearch(term));
      setNowPlaying(await nowPlayingMovies);
    };
    fetchApi();
    window.scroll(0, 0);
  }, [term]);
  const resultSearchList = resultSearch.map((movie, index) => {
    return (
      <>
        {" "}
        {movie.poster === `${imageUrl}null` ? null : (
          <CardMovies
            link="films"
            className="container-card col-md-2 col-sm-3"
            text="Evaluation : "
            key={index}
            id={movie.id}
            poster={movie.poster}
            title={movie.title}
            rating={movie.rating}
          />
        )}{" "}
      </>
    );
  });
  const resultSearchSeriesList = resultSearchSeries.map((serie, index) => {
    return (
      <>
        {" "}
        {serie.poster === `${imageUrl}null` ? null : (
          <CardMovies
            link="series"
            className="container-card col-md-2 col-sm-3"
            text="Evaluation : "
            key={index}
            id={serie.id}
            poster={serie.poster}
            title={serie.title}
            rating={serie.rating}
          />
        )}{" "}
      </>
    );
  });
  const nowPlayingMovieList = nowPlaying.slice(0, 1).map((movie, index) => {
    return (
      <div className="movies-background">
        {" "}
        <img src={movie.backPoster} alt={movie.title} key={index} />{" "}
      </div>
    );
  });
  return (
    <div className="movies-popular">
      <div className="container-movies"> {nowPlayingMovieList} </div>{" "}
      <div className="container row">
        {" "}
        <h3 className="text-info">
          {" "}
          Resultat : {term} ,
          <span>
            {resultSearch.length <= 1 ? (
              <span> {resultSearch.length} Film </span>
            ) : (
              <span> {resultSearch.length} Films </span>
            )}
          </span>
        </h3>
        <div>
          <p className="container row"> {resultSearchList} </p>
          <h3 className="text-info">
            Resultat : {term} ,
            {resultSearchSeries.length <= 1 ? (
              <span> {resultSearchSeries.length} Serie </span>
            ) : (
              <span> {resultSearchSeries.length} Series </span>
            )}
          </h3>
          <p className="container row"> {resultSearchSeriesList} </p>
        </div>
      </div>
    </div>
  );
};
export default SearchTerm;
