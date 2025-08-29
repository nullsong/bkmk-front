import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header, MainList, StatsList } from "@components";
import { reviews } from "@api/axiosAPI";
import { getUserId } from "@utils/utils";

const MainContainer = () => {
  const qc = useQueryClient();
  const userId = getUserId().userId;
  const [tab, setTab] = useState('read');

  const { data: reviewData } = useQuery({
    queryKey: ['reviews', userId],
    queryFn: () => reviews.getReviews({ userId }),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  })

  const { data: ratingData } = useQuery({
    queryKey: ['rating', userId],
    queryFn: () => reviews.getMyRating({ userId }),
    enabled: true
  })


  const { mutate: removeMyReview } = useMutation<string, Error, { reviewId: string; userId: string }>({
    mutationFn: reviews.removeMyReview,
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다!");
      qc.invalidateQueries({ queryKey: ['reviews', userId] });
    },
  });

  const handleDelete = (reviewId: string) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      removeMyReview({ reviewId, userId });
    }
  };

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab === 'read' ?
        <MainList data={reviewData} handleDelete={handleDelete} /> : <StatsList data={ratingData} />}
    </>
  )

}

export default MainContainer;