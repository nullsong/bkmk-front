import React, { useEffect, useRef, useState } from "react";

interface IProps {
  setKeyword: any,
  handleChangeInput: (e: any) => void,
  handleSearch: () => void,
}

const Header = ({ setKeyword, handleChangeInput, handleSearch }: IProps) => {
  const inputBoxRef = useRef<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputBoxRef.current && !inputBoxRef.current.contains(e.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching]);

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-10">
      {/* 상단 바 */}
      <div className="relative h-[100px] flex flex-col justify-center items-center pt-10 gap-7">
        {
          isSearching ?
            (<>
              <div className="flex items-center w-[90%] bg-gray-100 px-3 py-2 rounded-full"
                ref={inputBoxRef}
              >
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onChange={handleChangeInput}
                />
                <button
                  onClick={() => {
                    setKeyword("");
                    setIsSearching(false);
                  }}
                  className="ml-2 text-gray-500 hover:text-black text-xl"
                >
                  ×
                </button>
              </div>
            </>) :
            (<>
              {/* 메뉴 버튼 */}
              <button className="absolute left-7 top-1/2 w-[30px] h-[30px] bg-white flex items-center justify-center">
                <img src="/assets/images/menu.svg" alt="메뉴 아이콘" className="w-6 h-6" />
              </button>

              {/* 타이틀 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
                <span className="font-bold text-[20px] leading-[24px] text-[#242424]">
                  BookMarker
                </span>
              </div>

              {/* 검색 버튼 */}
              <div className="absolute right-7 top-1/2 flex gap-4">
                <div className="relative w-[30px] h-[30px] bg-white flex items-center justify-center"
                  onClick={() => setIsSearching(true)} >
                  <img src="/assets/images/search.svg" alt="검색" className="w-6 h-6" />
                </div>
              </div>
            </>)
        }
      </div>

      {/* 탭 메뉴 */}
      <nav className="w-full h-[52px] bg-white flex">
        <div className="w-1/2 flex flex-col items-center pt-4">
          <span className="text-sm font-bold text-[#242424]">내가 읽은 책</span>
          <div className="w-full h-[3px] bg-[#495AF3]" />
        </div>
        <div className="w-1/2 flex flex-col items-center pt-4">
          <span className="text-sm text-[#808080]">나의 독서</span>
          <div className="w-full h-[3px] bg-white" />
        </div>
      </nav>
    </header>
  );
}

export default Header;