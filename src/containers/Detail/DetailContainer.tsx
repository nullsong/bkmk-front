import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { BookDetail } from "@components";
import { books, reviews } from '@api/axiosAPI';
import { ModifyReviewParams, ReviewParams } from "types/ReviewTypes";
import { getUserId } from "@utils/utils";

const DetailContainer = () => {
  const { state } = useLocation();
  const { data, isSearch } = state;
  const isbn = data.isbn;

  const navigate = useNavigate();
  const userId = getUserId().userId;

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleChange = (i: number) => {
    if (i === rating) {
      setRating(0);
    } else {
      setRating(i);
    }
  }
  const handleClick = () => {
    // 리뷰 수정할 떼
    if (reviewData) {
      modifyMutate({
        userId,
        reviewId: reviewData.reviewId,
        reviewRating: rating,
        reviewText: text
      })
    } else {
      // 최초에 리뷰 등록할 때
      createMutate({
        userId,
        reviewRating: rating,
        reviewText: text,
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
    }
  };

  const { mutate: createMutate } = useMutation<string, Error, ReviewParams>({
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
    queryKey: ['review', isbn],
    queryFn: () => reviews.getMyReview({ userId, isbn }),
    enabled: true,
  });

  const { mutate: modifyMutate } = useMutation<string, Error, ModifyReviewParams>({
    mutationFn: reviews.modifyMyReview,
    onSuccess: async () => {
      alert("리뷰가 수정되었습니다!");
      navigate('/home');
    },
  });

  useEffect(() => {
    if (isSuccess && reviewData) {
      setRating(reviewData.reviewRating);
      setText(reviewData.reviewText);
    }
  }, [isSuccess, reviewData]);

  return (
    <>
      <BookDetail bookData={isSearch ? data : bookData} rating={rating} text={text} setText={setText} handleChange={handleChange} handleClick={handleClick} />
    </>
  )
}

export default DetailContainer;