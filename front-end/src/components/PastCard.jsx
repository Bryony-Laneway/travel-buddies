import { Link } from "react-router-dom";
export function PastCard(props) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3">
      <Link className="single-card-link" to="/SinglePastTrip">
        <div className="card">
          <img src={props.img} className="card-img-top" alt="Past trip photo" />
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {props.date}
            </h6>
            <p>Host: {props.host}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PastCard;
