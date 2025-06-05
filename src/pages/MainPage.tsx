import axiosInstance from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Header from "components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const [keyword,setKeyword] = useState('');

  const changeInput = (e: any) => {
    const val = e.target.value;
    setKeyword(val);
  }

  /**
   * 책 검색
   */
  const getBooks = async(param: any) => {
    const response = await axiosInstance.get('/book/' ,{ params: param });
    return response.data;
  };

  const { data , refetch } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => getBooks({keyword}),
    enabled: false,
  })

  data && console.log(data);

  /**
   * 내 리뷰 조회 
   */
  const getReviews = async(param: any) => {
    const response = await axiosInstance.get('/review/list' ,{ params: param });
    return response.data;
  };

  const { data : rData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews({ userId: "1"}),
    enabled: true,
  })


  return (
    <>
    <Header />
    <div className="relative w-full max-w-[600px] min-h-screen pt-[125px] mx-auto bg-[#F7F7F7]">
      {/* 내가 읽은 책 */}
      <section className="w-full bg-white px-4 sm:px-7 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {rData && rData?.map((e: any, i: number) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center p-6 gap-6 w-full max-w-[319px] bg-[#F7F7F7] rounded-md shadow-sm"
              onClick={()=> navigate(`/book/${e.isbn}`, { state: e })}
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
                <div className="text-center text-[#808080] text-[14px] leading-[17px]">
                  {e.reviewRating}
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
    </div></>
  );
}

export default MainPage;