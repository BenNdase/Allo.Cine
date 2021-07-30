import "./Footer.scss";
import {Link} from "react-router-dom";

const Footer = () => {
    return(
        <div className="footer">
            <div className="navbar-brand footer-logo">
                <span className="text-info">Ben</span>
                <span className="bg-info">Ciné</span>
            </div>
            <div className="footer-contact">
                <div className="footer-title">
                    <h3><hr/>Rejoignez nous<hr/></h3>
                </div>
                <div className="footer-link">
                    <Link to="">
                        <span className="iconify" data-icon="entypo-social:facebook-with-circle" data-inline="false"></span>
                    </Link>
                    <Link to="">
                        <span className="iconify" data-icon="entypo-social:twitter-with-circle" data-inline="false"></span>
                    </Link>
                    <Link to="">
                        <span className="iconify" data-icon="entypo-social:instagram-with-circle" data-inline="false"></span>
                    </Link>
                    <Link to="">
                        <span className="iconify" data-icon="entypo-social:linkedin-with-circle" data-inline="false"></span>
                    </Link>
                    <Link to="">
                        <span className="iconify" data-icon="entypo-social:youtube-with-circle" data-inline="false"></span>
                    </Link>
                </div>
                <div className="footer-navbar">
                    <Link to="/" className="text-white text-decoration-none">Accueil</Link>
                    <Link to="/films" className="text-white text-decoration-none">Films</Link>
                    <Link to="/séries" className="text-white text-decoration-none">Séries</Link>
                    <Link to="/aide" className="text-white text-decoration-none">Aide</Link>
                    <Link to="/apropos" className="text-white text-decoration-none">A propos</Link>
                </div>
                <div className="copyright text-white">
                    <p>Copyright &copy;2021 | Ben.ciné</p>
                </div>
            </div>
        </div>
    )
}
export default Footer;