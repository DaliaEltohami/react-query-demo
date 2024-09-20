import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export default function RQSuperHeroPage() {
  const { heroId } = useParams();

  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    console.log(isError, error);
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>Super Hero Details Page</h1>

      <div>
        <span>{data?.data.name}</span> - <span>{data?.data.alterEgo}</span>
      </div>
    </div>
  );
}
