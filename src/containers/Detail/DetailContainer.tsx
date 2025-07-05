import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { BookDetail } from "@components";
import { books, reviews } from '@api/axiosAPI';
import { ReviewParams } from "types/ReviewTypes";

const DetailContainer = () => {
  const { state } = useLocation();
  const { data, isSearch } = state;

  const isbn = data.isbn;
  const bookSrno = data.bookSrno;

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
      isbn,
      bookInfo: {
        title: data.title,
        author: data.author,
        isbn,
        publisher: data.publisher,
        publishedDate: data.publishedDate,
        image: data.image,
        description: data.description
      }
    })
  };

  const { mutate } = useMutation<string, Error, ReviewParams>({
    mutationFn: reviews.createMyReview,
    onSuccess: async () => {
      alert("리뷰가 저장되었습니다!");
      navigate('/home');
    },
  });

  const { data: bookData } = useQuery({
    queryKey: ['bookinfo', isbn],
    queryFn: () => books.getBookInfo({ isbn }),
    enabled: !isSearch,
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
      <BookDetail bookData={isSearch ? data : bookData} rating={rating} handleChange={handleChange} handleClick={handleClick} />
    </>
  )
}

export default DetailContainer;