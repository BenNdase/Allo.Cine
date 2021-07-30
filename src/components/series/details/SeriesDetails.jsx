import { useState, useEffect } from "react";
import {
  fetchSeriesDetails,
  posterUrl,
  fetchCastsSeries,
  fetchSimilarSeries,
  fetchSeriesVideos,
} from "../../../service/api";
import CardSeries from "../../card/Card";
import Modal from "../../modal/Modal";
import Avatar from "../../../assets/avatar.png";

const SeriesDetails = ({ match }) => {
  let paramsSeriesDetails = match.params;
  const [detail, setDetail] = useState([]);
  const [castsSeries, setCastsSeries] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [video, setVideo] = useState([]);
  const imageUrl = posterUrl;
  let genres = detail.genres;
  let productionCompagnies = detail.production_companies;
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const avatar = Avatar;
  // let seasons = detail.seasons

  useEffect(() => {
    const fetchApi = async () => {
      setDetail(await fetchSeriesDetails(paramsSeriesDetails.id));
      setCastsSeries(await fetchCastsSeries(paramsSeriesDetails.id));
      setSimilarSeries(await fetchSimilarSeries(paramsSeriesDetails.id));
      setVideo(await fetchSeriesVideos(paramsSeriesDetails.id));
    };
    fetchApi();
    window.scroll(0, 0);
  }, [paramsSeriesDetails.id]);

  const setRating = (rating) => {
    if (rating >= 8) {
      return "text-success";
    } else if (rating >= 6) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  };
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
  let releaseDate = new Date(detail.last_air_date).toLocaleString("fr-FR", {
    // weekday:"long",
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  const castsList = castsSeries.slice(0, 12).map((cast, index) => {
    return (
      <>
        {cast.image === null ? (
          <CardSeries
            className="container-card col-md-2 col-sm-3"
            link="series"
            key={index}
            id={cast.id}
            poster={`${avatar}`}
            title={cast.name}
            text={cast.character}
          />
        ) : (
          <CardSeries
            className="container-card col-md-2 col-sm-3"
            link="series"
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

  const similarSeriesList = similarSeries.slice(0, 12).map((serie, index) => {
    return (
      <>
        <CardSeries
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

  const videoViewer = () => {
    if (video) {
      return <Modal titleMovie={detail.title} url={youtubeUrl + video.key} />;
    } else {
      return null;
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
          <CardSeries
            className="container-card col-md-3 col-sm-3"
            link="series"
            id={detail.id}
            poster={`${imageUrl}${detail.poster_path}`}
          />
          <div className="movie-description col-md-8 inline-block police-roboto">
            <h2 className="text-info">{detail.name}</h2>
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
                | {releaseDate} |
              </span>
              <span
                className={`text-white police-ubuntu ${setRating(
                  detail.vote_average
                )}`}
              >
                Série
              </span>
            </p>
            <h5 className="text-white">{detail.tagline}</h5>
            <p className="text-white text-justify">{detail.overview}</p>
            <div>
              <h5 className="text-info">Saisons</h5>
              <p className="text-white text-justify">
                <span>Total saison : </span>{" "}
                <span className="text-white">
                  {detail.number_of_seasons} Saisons
                </span>
              </p>
            </div>
            <div>
              <h5 className="text-info">Production</h5>
              <p className="text-white text-justify">
                {productionCompagnies && productionCompagniesList}
              </p>
            </div>
            <p></p>
            {videoViewer()}

            {/* <p>{video.keys}</p> */}
          </div>
        </div>
      </div>
      <div className="movies-popular">
        <div className="container row">
          <h3 className="text-info mt-1">Acteurs</h3>
          <div className="container row m-auto">{castsList}</div>
        </div>
        <div className="container row">
          <h3 className="text-info">Séries similaires</h3>
          <div className="container row m-auto">{similarSeriesList}</div>
        </div>
      </div>
    </div>
  );
};
export default SeriesDetails;
