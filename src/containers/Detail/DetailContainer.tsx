import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { BookDetail } from "@components";
import { books, reviews } from '@api/axiosAPI';
import { ReviewParam } from "types/ReviewTypes";

const DetailContainer = () => {
  const { state } = useLocation();
  const isbn = state.isbn;
  const bookSrno = state.bookSrno;

  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const handleChange = (i: number) => {
    if (i === rating) {
      setRating(0);
    } else {
      setRating(i);
    }
  }
  const handleClick = () => {
    mutate({
      reviewRating: rating,
      isbn: state.isbn,
      bookInfo: {
        title: state.title,
        author: state.author,
        isbn,
        publisher: state.publisher,
        publishedDate: state.publishedDate,
        image: state.image,
        description: state.description
      }
    })
  };

  const { mutate } = useMutation<any, Error, ReviewParam>({
    mutationFn: reviews.createMyReview,
    onSuccess: async () => {
      alert("리뷰가 저장되었습니다!");
      navigate('/');
    },
  });

  const { data: bookData } = useQuery({
    queryKey: ['bookinfo', isbn],
    queryFn: () => books.getBookInfo({ isbn }),
    enabled: !state.isSearch,
  });

  const { data: reviewData, isSuccess } = useQuery({
    queryKey: ['review', bookSrno],
    queryFn: () => reviews.getMyReview({ userId: "1", bookSrno }),
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess && reviewData?.reviewRating) {
      setRating(reviewData.reviewRating);
    }
  }, [isSuccess, reviewData]);

  return (
    <>
      <BookDetail bookData={state.isSearch ? state : bookData} rating={rating} handleChange={handleChange} handleClick={handleClick} />
    </>
  )
}

export default DetailContainer;