import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    return (
        <>
        {state.map((e: any) => (
            <><div>
                *{e.title} || {e.author} || {e.publisher}</div>
                <button onClick={()=>navigate(`/book/${e.isbn}`, { state: e })}>상세 이동버튼</button>
</>
        ))}</>
    )
}

export default SearchPage;