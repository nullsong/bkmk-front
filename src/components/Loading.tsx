import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full mt-52 flex items-center justify-center text-gray-600 text-xl flex-col">
      <FadeLoader color="#495AF3" margin={3} />
      <div className="m-6">서버를 깨우는 중입니다...</div>
    </div>
  )
}

export default Loading;