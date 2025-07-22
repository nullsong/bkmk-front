import { LoginParams } from "types/ReviewTypes";

interface IProps {
  userId: string,
  setUserId: (e: string) => void,
  password: string,
  setPassword: (e: string) => void,
  mutate: ({ userId, password }: LoginParams) => void,
}

const AuthInput = ({ userId, setUserId, password, setPassword, mutate }: IProps) => {
  return (
    <>
      <div className="flex flex-col items-start p-[28px] gap-[28px] absolute h-[264px] bg-[#ffffff]">
        <div className="gap-[16px] w-[319px] h-[90px] flex-none self-stretch">
          <div className="h-[25px] text-[14px] leading-[17px] font-normal text-[#808080] font-['Inter'] order-0">ID</div>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            className="flex flex-row items-start p-[20px] gap-[10px] w-[319px] h-[57px] bg-[#F7F7F7] order-1"
            defaultValue={"test@gmail.com"}
            onChange={(e) => setUserId(e.target.value)} />

          <div className="h-[25px] text-[14px] mt-10 leading-[17px] font-normal text-[#808080] font-['Inter'] order-0">PASSWORD</div>
          <input
            type="text"
            placeholder="비밀번호를 입력하세요"
            className="flex flex-row items-start p-[20px] gap-[10px] w-[319px] h-[57px] bg-[#F7F7F7] order-1"
            defaultValue={"1234"}
            onChange={(e) => setPassword(e.target.value)} />
          <button className="flex flex-row justify-center items-center mt-10 gap-[10px] w-[319px] h-[56px] bg-[#495AF3]" onClick={() => mutate({ userId, password })}>
            <div className="w-[131px] h-[17px] text-[14px] leading-[17px] font-bold text-white text-center font-['Inter']">로그인</div>
          </button>
        </div >
      </div >
    </>
  )
}

export default AuthInput;