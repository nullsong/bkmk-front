import React from "react";

interface IProps {
  data: any;
  rating: number;
  handleChange: (e: any) => void;
  handleClick: (e: any) => void;
}

const BookDetail = ({ data, rating, handleChange, handleClick }: IProps) => {
  return (
    <>
      <div>{data.author}</div>
      <div>{data.title}</div>
      <div>{data.publisher}</div>
      <div>{data.publishedDate}</div>
      <div>{data.isbn}</div>
      <img src={data.image} alt={`${data.title} 표지`} width={200} />
      <div>{data.description}</div>
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
  )
}

export default BookDetail;