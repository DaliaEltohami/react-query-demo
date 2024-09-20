import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUser = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourses = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueries({ email }) {
  const { data: user } = useQuery(["user", email], () => fetchUser(email));
  const channelId = user?.data.channelId;
  useQuery(["courses", channelId], () => fetchCourses(channelId), {
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
}
