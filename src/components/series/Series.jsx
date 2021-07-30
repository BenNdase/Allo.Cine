import { useState, useEffect } from "react";
import {
  fetchPopularSeries,
  fetchSeriesByGenres,
  genreSeriesList,
} from "../../service/api";
import CardSeries from "../card/Card";

const Series = () => {
  const [genreSeries, setGenreSeries] = useState([]);
  const [series, setSeries] = useState([]);
  const [seriesByGenre, setSeriesByGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      setSeries(await fetchPopularSeries());
      setGenreSeries(await genreSeriesList);
      setSeriesByGenre(await fetchSeriesByGenres());
    };
    fetchApi();
    window.scroll(0, 0);
  }, []);

  const handleGenreClick = async (page, genreId) => {
    setSeriesByGenre(await fetchSeriesByGenres(page, genreId));
  };

  const seriesList = series.slice(0, 1).map((serie, index) => {
    return (
      <div className="movies-background">
        <img src={serie.backPoster} alt={serie.title} key={index} />
      </div>
    );
  });
  const seriesGenreList = genreSeries.map((serie, index) => {
    return (
      <li className="list-inline-item pb-1" key={index}>
        <button
          type="button"
          className="btn btn-outline-info text-white"
          onClick={() => {
            handleGenreClick(currentPage, serie.id);
          }}
        >
          {serie.name}
        </button>
      </li>
    );
  });
  const seriesByGenreList = seriesByGenre.slice(0, 18).map((serie, index) => {
    return (
      <>
        <CardSeries
          className="container-card col-md-2 col-sm-3"
          text="Evaluation : "
          key={index}
          id={serie.id}
          poster={serie.poster}
          title={serie.title}
          rating={serie.rating}
          link="series"
        />
      </>
    );
  });

  const disabledButton = (page) => {
    if (page <= 1) {
      return "d-none";
    }
  };
  return (
    <div className="movies-popular">
      <div className="container-movies">{seriesList}</div>
      <div>
        <div>
          <div className="row mt-3 container list-movies">
            <div className="col">
              <ul className="list-inline text-center">{seriesGenreList}</ul>
            </div>
          </div>
        </div>
        <div className="container row">{seriesByGenreList}</div>
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
  );
};
export default Series;
