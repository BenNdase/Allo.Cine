import { NavLink, useHistory, useLocation } from "react-router-dom";
import {useState} from "react";
import { fetchQueryMovieSearch } from "../../service/api";
import './Navbar.scss';

const Navigationbar = () => {
  const [search, setSeacrh] = useState('');
  const hystory = useHistory();
  const location = useLocation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await fetchQueryMovieSearch(search);
    location.state = search;
    hystory.push(`/recherche/${search}`);
    setSeacrh("");
  }
  const handleOnChange = (e) => {
    setSeacrh(e.target.value);
  }
  return (
        <div className="w-100" id="home">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand police-opensans">
              <span className="text-info">Ben</span>
              <span className="bg-info">Ciné</span>
            </div>
            <div className="navbar-items navbar-collapse text-justify font-weight-bold" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink exact activeClassName="current" className="nav-link text-lg-start text-white" aria-current="page" to="/">Accueil</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact activeClassName="current" className="nav-link text-lg-start text-white" to="/films">Films</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact activeClassName="current" className="nav-link text-lg-start text-white" to="/series">Séries</NavLink>
                </li>
              </ul>
            </div>
            <form className="d-flex" onSubmit={handleOnSubmit}>
              <input className="form-control me-2" type="search" placeholder="Recherche ..." aria-label="Recherche" value={search} onChange={handleOnChange} />
            </form>
          </nav>
        </div>
  );
};
export default Navigationbar;