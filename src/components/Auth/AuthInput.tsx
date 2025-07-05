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
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        className="w-full "
        defaultValue={"test@gmail.com"}
        onChange={(e) => setUserId(e.target.value)} />

      <input
        type="text"
        placeholder="비밀번호를 입력하세요"
        className="w-full"
        defaultValue={"1234"}
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={() => mutate({ userId, password })}>로그인</button>
    </>
  )
}
export default AuthInput;