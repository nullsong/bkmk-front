import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Header, MainList } from "@components";
import useSearchStore from "store/useSearchStore";
import { books, reviews } from "@api/axiosAPI";

const MainContainer = () => {
  const navigate = useNavigate();
  const { keyword } = useSearchStore();

  const { refetch } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => books.getBooks({ keyword }),
    enabled: false,
  })

  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviews.getReviews({ userId: "1" }),
    enabled: true,
  })

  const handleSearch = async () => {
    const { data } = await refetch();
    if (data) {
      navigate("/search", { state: { data } });
    }
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <MainList data={rData} />
    </>
  )

}

export default MainContainer;