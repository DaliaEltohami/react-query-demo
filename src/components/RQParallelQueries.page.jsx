import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export default function RQParallelQueries() {
  const { data: superHeroesData } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friendsData } = useQuery("friends", fetchFriends);
  return <div>RQParallelQueries</div>;
}
