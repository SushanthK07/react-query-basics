import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const superHeroes = queryClient.getQueryData(["super-heroes"])?.data;
      const hero = superHeroes?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      }
    },
  });
};
