import React from "react";
import { Search } from "@components";
import { useLocation } from "react-router-dom";

const SearchContainer = () => {
  const { state } = useLocation();

  return (
    <>
      <Search state={state} />
    </>
  )

}

export default SearchContainer;