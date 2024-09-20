import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SuperHeroes() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // return (
  //   <>
  //     <h1>Tradiotional Super Heroes </h1>
  //     {isLoading && <h2>Loading...</h2>}
  //     {data.length > 0 &&
  //       data.map((hero) => {
  //         return <div key={hero.id}>{hero.name}</div>;
  //       })}
  //   </>
  // );

  return (
    <>
      <h1>Tradiotional Super Heroes </h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        data.map((hero) => {
          return <div key={hero.id}>{hero.name}</div>;
        })
      )}
    </>
  );
}
