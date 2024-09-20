import React, { useState } from "react";

import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link, Outlet } from "react-router-dom";
import { useAddSuperHeroData } from "../hooks/useSuperHeroData";
import { useQueryClient } from "react-query";

export default function RQSuperHeroes() {
  const [refetchInterval, setRefetchInterval] = useState(false);
  const [name, setHeroName] = useState("");
  const [alterEgo, setHeroAlterEgo] = useState("");
  const [isAddedVisible, setIsAddedVisible] = useState(false);

  const queryClient = useQueryClient();

  const handleAddHero = () => {
    const hero = {
      name,
      alterEgo,
    };
    addHero(hero);
  };

  const onMutationSuccess = (data) => {
    // Show the "Added" text
    setIsAddedVisible(true);
    // refetch();
    // queryClient.invalidateQueries("super-heroes");

    // queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data],
    //   };
    // });

    console.log(`isAddedVisible, ${isAddedVisible}`);

    // Hide the text after 5 seconds
    setTimeout(() => {
      setIsAddedVisible(false);
    }, 5000); // 5000 ms = 5 seconds
  };

  const onSuccess = (data) => {
    if (data.length >= 4) {
      setRefetchInterval(false);
    }
    console.log("side Effect After Query Success", data);
  };
  const onError = (error) => {
    console.log(`side Effect After Query Error ${error}`);
  };

  const {
    mutate: addHero,
    isLoading: loadingAddHero,
    isError: errorAddingHero,
    error: addingHeroError,
  } = useAddSuperHeroData(onMutationSuccess);

  // const select = (data) => {
  //   const heroesNames = data.data.map((hero) => hero.name);
  //   return heroesNames;
  // };

  const { isLoading, isFetching, data, refetch, isError, error } =
    useSuperHeroesData({
      onSuccess,
      onError,
      refetchInterval,
      // select,
      // refetchOnMount: false,
    });

  // const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
  //   "super-heroes",
  //   superHeroesFetcher,
  //   {
  //     cacheTime: 50000,
  //     staleTime: 30000,
  //     refetchOnMount: true,
  //     refetchOnWindowFocus: true,
  //     // enabled: false,
  //     refetchInterval: refetchInterval,
  //     onSuccess,
  //     onError,
  //     select: (data) => {
  //       const heroesNames = data.data.map((hero) => hero.name);
  //       return heroesNames;
  //     },
  //   }
  // );

  return (
    <div>
      <h1>React Query Super Heroes</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setHeroName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setHeroAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero</button>
      </div>
      <div>
        {loadingAddHero ? (
          <h2>Adding Hero ...</h2>
        ) : errorAddingHero ? (
          <h2>{addingHeroError.message}</h2>
        ) : null}
        {isAddedVisible && <p>Hero Added</p>}
      </div>
      <button onClick={refetch}>view superheroes</button>
      {isLoading ? (
        <h2>Loading..</h2>
      ) : isError ? (
        <h2>{error.message}</h2>
      ) : (
        data?.data.map((hero) => (
          <div key={hero.id}>
            <Link to={`${hero.id}`}>{hero.name}</Link>
          </div>
        ))
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
