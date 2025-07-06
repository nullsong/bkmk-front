import { useQuery } from "@tanstack/react-query";
import { Header, MainList } from "@components";
import { reviews } from "@api/axiosAPI";
import { useSearch } from "hooks/useSearch";
import { getUserId } from "@utils/utils";

const MainContainer = () => {
  const userId = getUserId().userId;

  const { data: rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviews.getReviews({ userId }),
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