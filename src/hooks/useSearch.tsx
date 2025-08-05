import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { books } from "@api/axiosAPI"
import useSearchStore from "store/useSearchStore";

export const useSearch = () => {
  const navigate = useNavigate();
  const { keyword } = useSearchStore();

  const { refetch, isLoading, error } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => books.getBooks({ keyword, start: 1 }),
    enabled: false,
  })

  const handleSearch = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        console.log('이동');
        navigate("/search", { state: { data } });
      }
    } catch (e) {
      console.log("검색에러:", e);
    }
  }

  return { handleSearch, isLoading, error };

};