import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default function DynamicParallelQueries({ herosIds }) {
  const queriesResults = useQueries(
    herosIds.map((heroId) => {
      return {
        queryKey: ["super-hero", heroId],
        queryFn: () => fetchSuperHero(heroId),
      };
    })
  );

  console.log({ queriesResults });
  return <div>DynamicParallelQueries</div>;
}
