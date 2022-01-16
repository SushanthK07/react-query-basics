import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefreshInterval] = React.useState(3000);
  const onSuccess = (data) => {
    const numberOfSuperHeroes = data.data.length;
    if (numberOfSuperHeroes === 4) {
      setRefreshInterval(false);
    }
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    setRefreshInterval(false);
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      refetchInterval,
      onSuccess,
      onError,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
