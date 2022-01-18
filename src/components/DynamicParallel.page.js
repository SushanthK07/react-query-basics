import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queries = heroIds.map((id) => {
    return {
      queryKey: ["super-hero", id],
      queryFn: () => fetchSuperHero(id),
    };
  });
  const queryResults = useQueries(queries);

  console.log({ queryResults });
  return (
    <>
      {queryResults.map((result, i) => {
        if (result.isLoading) return <h4 key={`index-${i}`}>Loading</h4>;
        const data = result?.data;
        return (
          <div key={data?.data.id}>
            <h2>Super Hero {data?.data.id}</h2>
            <p>
              {data?.data.name} - {data?.data.alterEgo}
            </p>
          </div>
        );
      })}
    </>
  );
};
