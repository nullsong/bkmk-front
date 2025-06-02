import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white fixed top-0 left-0 z-10">
      {/* 상단 바 */}
      <div className="relative h-[100px] flex flex-col justify-center items-center pt-10 gap-7">
        {/* 좌측 버튼 */}
        <button className="absolute left-7 top-1/2 w-[30px] h-[30px] bg-white flex items-center justify-center">
          <img src="/assets/images/menu.svg" alt="메뉴 아이콘" className="w-6 h-6" />
        </button>

        {/* 타이틀 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
          <span className="font-bold text-[20px] leading-[24px] text-[#242424]">
            BookMarker
          </span>
        </div>

        {/* 우측 버튼들 */}
        <div className="absolute right-7 top-1/2 flex gap-4">
          <div className="relative w-[30px] h-[30px] bg-white flex items-center justify-center">
            <img src="/assets/images/search.svg" alt="검색" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <nav className="w-full h-[52px] bg-white flex">
        <div className="w-1/2 flex flex-col items-center pt-4">
          <span className="text-sm font-bold text-[#242424]">탭1</span>
          <div className="w-full h-[3px] bg-[#495AF3]" />
        </div>
        <div className="w-1/2 flex flex-col items-center pt-4">
          <span className="text-sm text-[#808080]">탭2</span>
          <div className="w-full h-[3px] bg-white" />
        </div>
      </nav>
    </header>
  );
}

export default Header;