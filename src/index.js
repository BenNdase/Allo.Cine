import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import "./sass/typography/Index.scss";
import 'react-slideshow-image/dist/styles.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById("madesu")
)
