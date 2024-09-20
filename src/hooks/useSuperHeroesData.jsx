import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export function useSuperHeroesData({ ...arg }) {
  return useQuery("super-heroes", fetchSuperHeroes, {
    ...arg,
  });
}
