import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(
    `http://localhost:4000/colors?_page=${pageParam}&_per_page=2`
  );
};

export default function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  console.log(data);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>Infinite Queries</h1>
      {/* {data?.data.map((color) => (
        <div key={color.id}>
          <span>{color.id}</span>
          <span>{color.label}</span>
        </div>
      ))} */}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.data.map((color) => (
            <div key={color.id}>
              <span>{color.id}</span>
              <span>{color.label}</span>
            </div>
          ))}
        </Fragment>
      ))}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}
