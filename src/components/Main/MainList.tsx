import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from '@images/star.svg';
import Empty from '@images/star_empty.svg';

const MainList = ({ data, handleDelete }: any) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="relative w-full max-w-[600px] min-h-screen pt-[125px] mx-auto bg-[#F7F7F7]">
        {/* 내가 읽은 책 */}
        <section className="w-full bg-white px-4 sm:px-7 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {(showAll ? data : data?.slice(0, 10))?.map?.((e: any, i: number) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center p-6 gap-3 w-full max-w-[319px] bg-[#F7F7F7] rounded-md shadow-sm"
              >
                <div className="flex w-full justify-end">
                  <div className="flex justify-center items-center w-[25px] h-[25px] text-[14px] mt-[-10px]" onClick={() => {
                    handleDelete(e.reviewId);
                  }}>X</div>
                </div>
                <div
                  onClick={() => navigate(`/book/${e.isbn}`, { state: { data: e } })}
                >
                  <div className="relative w-[263px] h-[225px]">
                    <img
                      src={e.image}
                      alt={`${e.title}image`}
                      className="absolute w-[150px] h-[225px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover" />
                  </div>
                  <div className="flex flex-col items-center gap-[10px] w-full">
                    <div className="text-center text-[#242424] font-bold text-[16px] leading-[19px]">
                      {e.title.length > 17 ? e.title.slice(0, 17) + '...' : e.title}
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 w-[120px]">
                      {[1, 2, 3, 4, 5].map((num: number) => (
                        num <= e.reviewRating ?
                          <Star /> :
                          <Empty />
                      ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data?.length > 10 && !showAll && (
            <div className="flex justify-center mt-6">
              <button className="flex justify-center items-center py-[19.5px] px-10 gap-2 w-full max-w-[319px] border border-[#EBEBEB] rounded"
                onClick={() => setShowAll(true)}>
                <span className="text-[#242424] font-bold text-[14px] leading-[17px]">Browse</span>
              </button>
            </div>
          )
          }
        </section >
      </div >
    </>
  )
}

export default MainList;