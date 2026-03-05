import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function VansDetails() {
  const params = useParams();
  const location = useLocation();
  const [van, setVan] = useState(null);
  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);
  const search = location.state?.search || "";
  const type =
    location.state.type?.charAt(0).toUpperCase() +
      location.state.type?.slice(1) || "all";

  // const typeSearch = search.split("?")[1].split("=")[1];
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} Vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt={van.name} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default VansDetails;
