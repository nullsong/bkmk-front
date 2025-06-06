import React, { useState } from "react";
import axiosInstance from "@api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type ReviewParam = {
  reviewRating: number;
  isbn: string;
  bookInfo: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishedDate: string;
    image: string;
    description: string;
  };
};

const DetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  const handleChange = (e: any) => {
    setRating(e.target.value);
  }

  const createMyReview = async (param: ReviewParam): Promise<any> => {
    const res = await axiosInstance.post('/review/', param);
    return res.data;
  };

  const { mutate } = useMutation<any, Error, ReviewParam>({
    mutationFn: createMyReview,
    onSuccess: async () => {
      alert("리뷰가 저장되었습니다!");
      navigate('/');
    },
  });

  const handleClick = () => {
    mutate({
      reviewRating: rating,
      isbn: state.isbn,
      bookInfo: {
        title: state.title,
        author: state.author,
        isbn: state.isbn,
        publisher: state.publisher,
        publishedDate: state.publishedDate,
        image: state.image,
        description: state.description
      }
    })
  };

  return (
    <>
      <div>{state.author}</div>
      <div>{state.title}</div>
      <div>{state.publisher}</div>
      <div>{state.publishedDate}</div>
      <div>{state.isbn}</div>
      <img src={state.image} alt={`${state.title} 표지`} width={200} />
      <div>{state.description}</div>
      <div>
        <label htmlFor="rating">별점주기</label>
        <select id="rating" value={rating} onChange={handleChange}>
          <option value={0}>선택해주세요</option>
          <option value={1}>⭐️</option>
          <option value={2}>⭐️⭐️</option>
          <option value={3}>⭐️⭐️⭐️</option>
          <option value={4}>⭐️⭐️⭐️⭐️</option>
          <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
        </select>
        {rating > 0 && <button onClick={handleClick}>저장하기 버튼</button>}
      </div>
    </>
  );
}
export default DetailPage;