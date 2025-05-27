import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const { state } = useLocation();
  const [rating, setRating] = useState(0);

  const handleChange = (e : any) => {
    setRating(e.target.value);
  }

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
    {rating > 0 && <button>저장하기 버튼</button>}
    </div>
    </>
  );
}
export default DetailPage;