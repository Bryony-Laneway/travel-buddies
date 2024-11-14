import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

export function UpcomingCard(props) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3">
     <div className="card shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <div className="card-body" style={{ paddingTop: '1rem' }}>
        <h5 className="card-title mb-2">{props.name}</h5>
        <p className="card-text mb-1" style={{ color: 'var(--gray-300)' }}>
          <strong>Start:</strong> {formatDate(props.start_date)} - <strong>End:</strong> {formatDate(props.end_date)}
        </p>
        <p className="mb-0 text-muted">Host: {props.host}</p>
        <Link to={`/SingleUpcomingTrip/${props.tripId}`} className="stretched-link"></Link>
      </div>
    </div>
  </div>
  );
}

export default UpcomingCard;
