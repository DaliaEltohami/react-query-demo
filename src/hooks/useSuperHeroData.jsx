import { request } from "../utils/axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  const [, heroId] = queryKey;
  //   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  return request({ url: `/superheroes/${heroId}` });
};

const postSuperHero = (hero) => {
  //   return axios.post("http://localhost:4000/superheroes", hero);
  request({ url: "/superheroes", method: "post", data: hero });
};

export function useSuperHeroData(heroId) {
  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === heroId);
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
}

export const useAddSuperHeroData = (onMutationSuccess) => {
  const queryClient = useQueryClient();
  return useMutation(postSuperHero, {
    onSuccess: onMutationSuccess,
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroesData = queryClient.getQueryData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroesData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.previousHeroesData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
