export function Card(props) {
  return (
    // <div className="card">
    //   <h5>{props.name}</h5>
    //   <p>{props.date}</p>
    //   <p>{props.host}</p>
    // </div>

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.date}</h6>
        <p className="card-text">{props.host}</p>
      </div>
    </div>
  );
}

export default Card;
