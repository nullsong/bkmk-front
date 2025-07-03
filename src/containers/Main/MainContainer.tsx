import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@api/axiosInstance";
import { Header, MainList } from "@components";
import useSearchStore from "store/useSearchStore";

const MainContainer = () => {
  const navigate = useNavigate();
  const { keyword } = useSearchStore();

  /**
   * 책 검색
   */
  const getBooks = async (param: any) => {
    const response = await axiosInstance.get('/book/', { params: param });
    return response.data;
  };

  const { refetch } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => getBooks({ keyword }),
    enabled: false,
  })

  /**
   * 내 리뷰 조회 
   */
  const getReviews = async (param: any) => {
    const response = await axiosInstance.get('/review/list', { params: param });
    return response.data;
  };

  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews({ userId: "1" }),
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