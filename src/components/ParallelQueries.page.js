import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { isLoading: isSuperHeroesLoading, data: superHeroes } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );
  const { isLoading: isFriendsLoading, data: friends } = useQuery(
    "friends",
    fetchFriends
  );
  console.log(superHeroes, friends);

  return (
    <>
      <h2>Super Heroes</h2>
      {isSuperHeroesLoading && <h4>Loading...</h4>}
      {superHeroes?.data.map((hero) => {
        return <div key={hero.id}> {hero.name}</div>;
      })}

      <h2>Friends</h2>
      {isFriendsLoading && <h4>Loading...</h4>}
      {friends?.data.map((friend) => {
        return <div key={friend.id}> {friend.name}</div>;
      })}
    </>
  );
};
