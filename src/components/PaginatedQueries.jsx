import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = async ({ queryKey }) => {
  const [, pageNumber] = queryKey;
  const pageData = await axios.get(
    `http://localhost:4000/colors?_page=${pageNumber}&_per_page=2`
  );

  return pageData;
};

export default function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    fetchColors,
    {
      keepPreviousData: true,
    }
  );
  console.log(data);
  return (
    <div>
      <h1>PaginatedQueries</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{error}</h2>
      ) : (
        data?.data.data.map((color) => <p key={color.id}>{color.label}</p>)
      )}
      <button
        onClick={() => {
          setPageNumber((page) => page - 1);
        }}
        disabled={pageNumber <= 1}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPageNumber((page) => page + 1);
        }}
        disabled={pageNumber >= 4}
      >
        Next
      </button>
      {isFetching && <div>Loading...</div>}
    </div>
  );
}
