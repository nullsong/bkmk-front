import { useNavigate } from "react-router-dom";
import useSearchStore from "store/useSearchStore";
import { useSearch } from "hooks/useSearch";

const Search = ({ data }: any) => {
  const navigate = useNavigate();
  const { keyword, changeKeyword } = useSearchStore();
  const { handleSearch } = useSearch();

  return (
    <div className="relative w-full max-w-[600px] min-h-screen pt-[125px] mx-auto">
      <div className="justify-items-center">
        <div className="flex items-center w-[90%] bg-gray-100 px-3 py-2 rounded-full">
          <svg
            className="w-4 h-4 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="책 제목을 입력하세요"
            className="w-full bg-transparent text-sm outline-none placeholder-gray-500"
            defaultValue={keyword}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()
            }
            onChange={e => changeKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 ml-8">총 {data.length} 개</div>
      <section className="w-full bg-white px-4 sm:px-7 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {data?.map?.((e: any, i: number) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center p-6 gap-6 w-full max-w-[319px] bg-[#F7F7F7] rounded-md shadow-sm"
              onClick={() => navigate(`/book/${e.isbn}`, { state: { data: e, isSearch: true } })}
            >
              <div className="relative w-[263px] h-[225px]">
                <img
                  src={e.image}
                  alt={`${e.title}image`}
                  className="absolute w-[150px] h-[225px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover" />
              </div>
              <div className="flex flex-col items-center gap-[10px] w-full">
                <div className="text-center text-[#242424] font-bold text-[16px] leading-[19px]">
                  {e.title}
                </div>
                <div className="text-center text-[#808080] text-[14px]">
                  {e.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Search;