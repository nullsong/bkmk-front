import React from "react";
import { Search } from "@components";
import { useLocation } from "react-router-dom";

const SearchContainer = () => {
  const { state } = useLocation();
  const { data } = state;

  return (
    <>
      <Search data={data} />
    </>
  )

}

export default SearchContainer;