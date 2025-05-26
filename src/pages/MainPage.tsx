import axiosInstance from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MainPage = () => {

  const [keyword,setKeyword] = useState('');

  const changeInput = (e: any) => {
    const val = e.target.value;
    setKeyword(val);
  }

  /**
   * 책 목록 조회 
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

  return (
    <>
      <div className="relative w-full h-[1527px] bg-[#F7F7F7] pt-[160px]">
        {/* 검색바 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="책 제목, 저자 검색"
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm"
          onChange={changeInput}
        />
        <button onClick={() => refetch()}>임시버튼(검색용)</button>
      </div>
      {/* Tabs */}
      <div className="w-[375px] h-[52px] flex flex-row justify-center items-start bg-white mx-auto">
        {/* 탭 메뉴 */}
        <button className="px-4 py-2 text-sm font-medium text-gray-400">내가 읽은 책</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-400">나의 독서</button>
      </div>
     
      {/* Body Content */}
      <div className="flex flex-col items-start gap-[10px] px-4">
        {/* 책 추가 박스 */}
        <div className="w-fçull bg-white p-4 rounded shadow-sm">
          <h2 className="text-lg font-bold">+</h2>
          <p className="text-sm text-gray-600 mt-1">책 추가</p>
        </div>

        {/* 읽은 책 박스 */}
        <div className="w-full bg-white p-4 rounded shadow-sm">데미안</div>
        <div className="w-full bg-white p-4 rounded shadow-sm">위대한 개츠비</div>
        <div className="w-full bg-white p-4 rounded shadow-sm">폭풍의 언덕</div>
      </div>
      </div>
      </>

  );
}

export default MainPage;