import React, { useState, useEffect } from "react";
import {
  fetchCasts,
  fetchMoviesVideos,
  fetchSimilarMovies,
  movieDetailsList,
} from "../../../service/api";
import CardMovies from "../../card/Card";
import { posterUrl } from "../../../service/api";
import Avatar from "../../../assets/avatar.png";
import "./MovieDetails.scss";
import Modal from "../../modal/Modal";

const MovieDetails = ({ match }) => {
  let paramsMovieDetails = match.params;
  const [detail, setDetail] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [video, setVideo] = useState([]);
  const imageUrl = posterUrl;
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const avatar = Avatar;

  useEffect(() => {
    const fetchApi = async () => {
      setDetail(await movieDetailsList(paramsMovieDetails.id));
      setCasts(await fetchCasts(paramsMovieDetails.id));
      setSimilarMovies(await fetchSimilarMovies(paramsMovieDetails.id));
      setVideo(await fetchMoviesVideos(paramsMovieDetails.id));
    };
    fetchApi();
    window.scroll(0, 0);
  }, [paramsMovieDetails.id]);
  let genres = detail.genres;
  let productionCompagnies = detail.production_companies;
  let releaseDate = new Date(detail.release_date).toLocaleString("fr-FR", {
    // weekday:"long",
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  const setRating = (rating) => {
    if (rating >= 8) {
      return "text-success";
    } else if (rating >= 6) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  };

  const videoViewer = () => {
    if (video) {
      return <Modal titleMovie={detail.title} url={youtubeUrl + video.key} />;
    } else {
      return null;
    }
  };
  // const MoviePlayer = () => {
  //     c
  //     return(

  //     )
  // }

  let genresList;
  let productionCompagniesList;

  if (genres) {
    genresList = genres.map((movie, index) => {
      return (
        <>
          <button
            type="button"
            className="text-white ml-1 btn border-info btn-sm police-ubuntu"
            key={index}
          >
            {movie.name}
          </button>
        </>
      );
    });
  }
  if (productionCompagnies) {
    productionCompagniesList = productionCompagnies.map((movie, index) => {
      return (
        <span key={index}>
          {/* {movie.logo_path != null ? <CardMovies className="container-card col-md-2 bg-info" id={detail.id} poster={`${imageUrl}${movie.logo_path}`}/>: null} */}
          {index ? <span> , </span> : null}
          {movie.name}
        </span>
      );
    });
  }
  const similarMoviesList = similarMovies.slice(0, 12).map((movie, index) => {
    return (
      <>
        <CardMovies
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
  const castsList = casts.slice(0, 12).map((cast, index) => {
    return (
      <>
        {cast.image === null ? (
          <CardMovies
            className="container-card col-md-2 col-sm-3"
            link="films"
            key={index}
            id={cast.id}
            poster={`${avatar}`}
            title={cast.name}
            text={cast.character}
          />
        ) : (
          <CardMovies
            className="container-card col-md-2 col-sm-3"
            link="films"
            key={index}
            id={cast.id}
            poster={`${imageUrl}${cast.image}`}
            title={cast.name}
            text={cast.character}
          />
        )}
      </>
    );
  });
  const runtimeMovies = () => {
    let runtime = detail.runtime;
    if (runtime < 60) {
      console.log(runtime);
      return `${runtime}min`;
    } else {
      let hour = parseInt(runtime / 60);
      let minutes = parseInt((runtime / 60 - hour) * 100);
      while (minutes > 59) {
        hour++;
        minutes = minutes - 60;
      }
      return `${hour}h ${minutes}min`;
    }
  };
  return (
    <div>
      <div className="detail-background carousel">
        <img
          src={`${imageUrl}${detail.backdrop_path}`}
          alt={detail.title}
          className="w-100"
        />
      </div>
      <div className="movie-details">
        <div className="movies-description">
          <CardMovies
            className="container-card col-md-3 col-sm-3"
            id={detail.id}
            poster={`${imageUrl}${detail.poster_path}`}
            link="films"
          />
          <div className="movie-description col-md-8 inline-block police-roboto">
            <h2 className="text-info">{detail.title}</h2>
            <p className="text-white">
              {genres && genresList} &nbsp;
              <span
                className={`text-white text-justify btn police-ubuntu ${setRating(
                  detail.vote_average
                )}`}
              >
                {detail.vote_average}{" "}
              </span>
              &nbsp;
              <span>
                |{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill text-info"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              </span>
              &nbsp;
              <span className="text-white police-ubuntu">
                {detail.popularity}
              </span>{" "}
              &nbsp;
              <span className="text-white text-justify police-ubuntu">
                | {releaseDate}
              </span>
              &nbsp;
              <span className="text-white police-ubuntu">
                | {runtimeMovies()} |{" "}
              </span>
              <span
                className={`text-white police-ubuntu ${setRating(
                  detail.vote_average
                )}`}
              >
                Film
              </span>
            </p>
            <p className="text-white text-justify">{detail.overview}</p>
            <div>
              <h5 className="text-info">Production</h5>
              <p className="text-white text-justify">
                {productionCompagnies && productionCompagniesList}
              </p>
            </div>
            {videoViewer()}
          </div>
        </div>
      </div>
      <div className="movies-popular">
        <div className="container row">
          <h3 className="text-info mt-1">Casting</h3>
          <div className="container row m-auto">{castsList}</div>
        </div>
        <div className="container row">
          {similarMoviesList !== 0 ? (
            <div>
              <h3 className="text-info">Films similaires</h3>
              <div className="container row m-auto">{similarMoviesList}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
