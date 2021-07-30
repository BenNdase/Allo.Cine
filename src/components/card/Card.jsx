import { Link } from "react-router-dom";
import "./Card.scss";
const Card = (props) => {
    const setRating = (rating) => {
      if(rating >= 8){
        return "text-success"
      }else if (rating >= 6){
        return "text-warning"
      }else{
        return "text-danger"
      }
    }
    return(
        <div className={props.className} key={props.key} >
            <div className="card text-center">
              <Link to={`/${props.link}/${props.id}`} className="card-link">
                  <div className="image-container">
                    <img src={props.poster} alt={props.title} className="card-image img-fluid" />
                  </div>
                  <p className="card-title">{props.title}</p>
                  <p className="card-description ">{props.text} <span className={setRating(props.rating)}>{props.rating}</span></p>
              </Link>
            </div>
        </div>
    )
}
export default Card;