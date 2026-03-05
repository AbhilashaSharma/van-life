import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const typeFilter = searchParams.get("type");
  React.useEffect(() => {
    setLoading(true);
    async function loadVans() {
      const data = await getVans();
      setVans(data);
      setLoading(false);
    }
    loadVans();
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;
  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} alt={van.name} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={
            typeFilter === "simple"
              ? "van-type simple selected"
              : "van-type simple"
          }
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={
            typeFilter === "luxury"
              ? "van-type luxury selected"
              : "van-type luxury"
          }
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={
            typeFilter === "rugged"
              ? "van-type rugged selected"
              : "van-type rugged"
          }
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            onClick={() => setSearchParams({})}
            className="van-type clear-filters"
          >
            Clear Filters
          </button>
        )}
      </div>
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <div className="van-list">{vanElements}</div>
      )}
    </div>
  );
}
