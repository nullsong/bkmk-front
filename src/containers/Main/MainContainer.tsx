import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Header, MainList, StatsList } from "@components";
import { reviews } from "@api/axiosAPI";
import { getUserId } from "@utils/utils";

const MainContainer = () => {
  const userId = getUserId().userId;
  const [tab, setTab] = useState('read');

  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviews.getReviews({ userId }),
    enabled: true,
  })

  const { mutate: removeMyReview } = useMutation<string, Error, { reviewId: string; userId: string }>({
    mutationFn: reviews.removeMyReview,
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다!");
      window.location.reload();
    },
  });

  const handleDelete = (reviewId: string) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      removeMyReview({ reviewId, userId });
    }
  };

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab === 'read' ?
        <MainList data={rData} handleDelete={handleDelete} /> : <StatsList />}
    </>
  )

}

export default MainContainer;