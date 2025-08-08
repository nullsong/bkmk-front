import { useQuery } from "@tanstack/react-query";
import { Header, MainList, StatsList } from "@components";
import { reviews } from "@api/axiosAPI";
import { getUserId } from "@utils/utils";
import { useState } from "react";

const MainContainer = () => {
  const userId = getUserId().userId;
  const [tab, setTab] = useState('read');

  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviews.getReviews({ userId }),
    enabled: true,
  })

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab === 'read' ?
        <MainList data={rData} /> : <StatsList />}
    </>
  )

}

export default MainContainer;