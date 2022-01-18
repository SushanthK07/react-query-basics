import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const BasicRQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      // cacheTime: 10000,
      // staleTime: 10000,
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: 2000,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
