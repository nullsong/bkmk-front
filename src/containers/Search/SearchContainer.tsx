import React from "react";
import { Search } from "@components";
import { useLocation } from "react-router-dom";

const SearchContainer = () => {
  const { state } = useLocation();
  const { data, keyword } = state;

  return (
    <>
      <Search data={data} keyword={keyword} />
    </>
  )

}

export default SearchContainer;