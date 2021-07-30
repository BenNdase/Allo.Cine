const Header = (props) => {
  return (
    <div className={props.className}>
      <div
        id="carousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" class="active"></li>
          <li data-target="#carousel" data-slide-to="1"></li>
          <li data-target="#carousel" data-slide-to="2"></li>
          <li data-target="#carousel" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={props.firstImage} alt={props.tile} />
          </div>
          <div className="carousel-item">
            <img src={props.secondImage} alt={props.name} />
          </div>
          <div className="carousel-item">
            <img src={props.thirdImage} alt={props.tile} />
          </div>
          <div className="carousel-item">
            <img src={props.fourthImage} alt={props.name} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
