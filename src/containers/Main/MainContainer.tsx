import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header, MainList, StatsList } from "@components";
import { reviews } from "@api/axiosAPI";
import { getUserId } from "@utils/utils";

const MainContainer = () => {
  const qc = useQueryClient();
  const userId = getUserId().userId;
  const [tab, setTab] = useState('read');

  const { data: rData } = useQuery({
    queryKey: ['reviews', userId],
    queryFn: () => reviews.getReviews({ userId }),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
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
    const handlePageShow = (e: any) => {
      if (e.persisted) {
        console.log("복원됨")
        qc.invalidateQueries({ queryKey: ['reviews', userId] });
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [qc, userId]);

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab === 'read' ?
        <MainList data={rData} handleDelete={handleDelete} /> : <StatsList />}
    </>
  )

}

export default MainContainer;