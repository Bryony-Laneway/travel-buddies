export function Card(props) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.date}
          </h6>
          <p className="card-text">{props.host}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
