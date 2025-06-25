import React from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ state }: any) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[600px] min-h-screen pt-[125px] mx-auto bg-[#F7F7F7]">
      <div>검색창</div>
      <div>총 n 개</div>
      <section className="w-full bg-white px-4 sm:px-7 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {state?.map?.((e: any, i: number) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center p-6 gap-6 w-full max-w-[319px] bg-[#F7F7F7] rounded-md shadow-sm"
              onClick={() => navigate(`/book/${e.isbn}`, { state: { ...e, isSearch: true } })}
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