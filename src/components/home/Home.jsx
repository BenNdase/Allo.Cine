import React, { useEffect, useState } from "react";
import "./Home.scss";
import { fetchPopularSeries, popularMoviesList } from "../../service/api";
import Header from "../header/Header";
import Card from "../card/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setMovies(await popularMoviesList);
      setSeries(await fetchPopularSeries());
    };
    fetchApi();
    window.scroll(0, 0);
  }, []);

  console.log(series);

  const tabMovies = [];
  const tabSeries = [];
  let movieTitle = "";
  let serieTitle = "";
  const moviesPopularList = movies.slice(0, 12).map((movie, index) => {
    tabMovies.push(movie.backPoster);
    movieTitle = movie.title;
    return (
      <>
        <Card
          className="container-card col-md-2 col-sm-3"
          link="films"
          text="Evaluation : "
          key={index}
          id={movie.id}
          poster={movie.poster}
          title={movie.title}
          rating={movie.rating}
        />
      </>
    );
  });
  const seriesPopularList = series.slice(0, 12).map((serie, index) => {
    tabSeries.push(serie.backPoster);
    serieTitle = serie.title;
    return (
      <>
        <Card
          className="container-card col-md-2 col-sm-3"
          link="series"
          text="Evaluation : "
          key={index}
          id={serie.id}
          poster={serie.poster}
          title={serie.title}
          rating={serie.rating}
        />
      </>
    );
  });

  return (
    <div>
      <div>
        <Header
          firstImage={tabMovies[0]}
          secondImage={tabSeries[0]}
          thirdImage={tabMovies[1]}
          fourthImage={tabSeries[1]}
          title={movieTitle}
          name={serieTitle}
        />
        <div className="movies-nowplaying">
          <div className="container row">
            <div className="movies">
              <h3 className="movies-title text-lg-start text-info">Films</h3>
              <Link to="/films" className="movies-link btn btn-outline-info">
                Voir tout
              </Link>
            </div>
            {moviesPopularList}
          </div>
        </div>

        <div className="movies-toprated">
          <div className="container row">
            <div className="movies">
              <h3 className="movies-title text-lg-start text-info">Séries</h3>
              <Link to="/series" className="movies-link btn btn-outline-info">
                Voir tout
              </Link>
            </div>
            {seriesPopularList}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
