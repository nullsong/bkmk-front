import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@api/axiosAPI";
import { AuthInput, Loading } from "@components";
import { LoginParams } from "types/ReviewTypes";

const AuthContainer = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("test@gmail.com");
  const [pw, setPw] = useState("1234");

  const { mutate } = useMutation<string, Error, LoginParams>({
    mutationFn: auth.postLogin,
    onSuccess: (res) => {
      localStorage.setItem('token', res);
      alert("로그인 되었습니다.");
      navigate('/home');
    },

    onError: () => {
      alert('로그인에 실패했습니다.');
    },
  })

  useEffect(() => {
    fetch("https://bkmk-1.onrender.com/ping")
      // fetch("http://localhost:8080/ping")
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);


  return (
    <>
      {isLoading ?
        <Loading /> :
        <AuthInput userId={id} setUserId={setId} password={pw} setPassword={setPw} mutate={mutate} />}
    </>
  )
}


export default AuthContainer;