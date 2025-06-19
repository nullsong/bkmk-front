import React from "react";
import { useNavigate } from "react-router-dom";

const MainList = ({ data }: any) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[600px] min-h-screen pt-[125px] mx-auto bg-[#F7F7F7]">
      {/* 내가 읽은 책 */}
      <section className="w-full bg-white px-4 sm:px-7 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {data?.map((e: any, i: number) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center p-6 gap-6 w-full max-w-[319px] bg-[#F7F7F7] rounded-md shadow-sm"
              onClick={() => navigate(`/book/${e.isbn}`, { state: e })}
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
                <div className="flex flex-row justify-center items-center gap-2 w-[16px]">
                  {[1, 2, 3, 4, 5].map((num: number) => (
                    num <= e.reviewRating ?
                      <img src="/assets/images/star.svg" alt="별점" /> :
                      <img src="/assets/images/star_empty.svg" alt="빈별점" />

                  ))
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="flex justify-center items-center py-[19.5px] px-10 gap-2 w-full max-w-[319px] border border-[#EBEBEB] rounded">
            <span className="text-[#242424] font-bold text-[14px] leading-[17px]">Browse</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default MainList;