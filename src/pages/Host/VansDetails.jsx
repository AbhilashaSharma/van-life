import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function VansDetails() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState(null);
  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentVan(data.vans);
      });
  });

  return currentVan ? (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt={currentVan.name} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <h2>Loading...</h2>
  );
}

export default VansDetails;
