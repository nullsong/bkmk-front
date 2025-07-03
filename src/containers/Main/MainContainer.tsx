import { useQuery } from "@tanstack/react-query";
import { Header, MainList } from "@components";
import { reviews } from "@api/axiosAPI";
import { useSearch } from "hooks/useSearch";

const MainContainer = () => {
  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviews.getReviews({ userId: "1" }),
    enabled: true,
  })

  const { handleSearch } = useSearch();

  return (
    <>
      <Header handleSearch={handleSearch} />
      <MainList data={rData} />
    </>
  )

}

export default MainContainer;