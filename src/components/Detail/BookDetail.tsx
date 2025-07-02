import React from "react";
import moment from 'moment';
import Star from '@images/star.svg';
import Empty from '@images/star_empty.svg';
interface IProps {
  data: any;
  rating: number;
  handleChange: (e: any) => void;
  handleClick: (e: any) => void;
}

const BookDetail = ({ data, rating, handleChange, handleClick }: IProps) => {

  return (
    <> {data &&
      <div className="relative w-full max-w-[600px] mx-auto bg-white min-h-screen px-6 py-7 flex flex-col items-center gap-7">
        <div className="w-[200px] h-[300px] relative">
          <img
            src={data.image}
            alt={`${data.title} 표지`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* 책 정보 */}
        <div className="flex flex-col items-center gap-2 text-center w-full">
          <h2 className="text-[#242424] text-[24px] font-bold leading-[29px]">
            {data.title}
          </h2>
          <div className="flex flex-col justify-center items-center gap-1 text-[#808080] text-[16px]">
            <span>{moment(data.publishedDate).format('YYYY.MM.DD')}</span>
            <span>{data.author} | {data.publisher}</span>
          </div>
        </div>

        {/* 줄거리 */}
        <p className="w-full max-w-[600px] text-[#808080] text-[16px] leading-[30px]">
          {data.description}
        </p>

        <div className="flex flex-col justify-center items-center p-7 gap-7 relative w-full max-w-[600px] h-[300px] bg-[#F7F7F7] border border-[#F0F0F0] w-full">
          <div className="flex flex-row justify-center items-center gap-2 w-full h-[48px]">
            {
              [1, 2, 3, 4, 5].map((num: number) => (
                <button
                  key={num}
                  onClick={() => handleChange(num)}
                >
                  {num <= rating ?
                    <Star /> :
                    <Empty />}
                </button>
              ))
            }
          </div>

          <div className="flex flex-col gap-2 w-full max-w-[600px] h-[91px]">
            <div className="flex justify-center items-center p-5 gap-2.5 w-full h-[91px] bg-[#F0F0F0]">
              <textarea
                placeholder="리뷰를 작성해주세요."
                className="w-full h-[51px] text-[14px] leading-[17px] text-[#808080] bg-transparent resize-none border-none focus:outline-none"
              />
            </div>
          </div>

          <button className="relative w-full h-[56px] bg-[#495AF3] text-white font-bold text-[14px] leading-[17px] text-center px-10 py-[19.5px]" onClick={handleClick}>
            저장
          </button>
        </div>
      </div >
    }
    </>
  )
}

export default BookDetail;