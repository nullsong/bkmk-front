import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@api/axiosInstance";
import { Header, MainList } from "@components";

const MainContainer = () => {
  const [keyword, setKeyword] = useState(''); // 검색 키워드

  /**
   * 책 검색
   */
  const getBooks = async (param: any) => {
    const response = await axiosInstance.get('/book/', { params: param });
    return response.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => getBooks({ keyword }),
    enabled: false,
  })

  // data && console.log(data);

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

  return (
    <>
      <Header />
      <MainList data={rData} />
    </>
  )

}

export default MainContainer;