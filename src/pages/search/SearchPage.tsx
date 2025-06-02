import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const { state } = useLocation();

    console.log(state)
    return (
        <>
        {state.map((e: any) => (
            <div>
                *{e.title} || {e.author} || {e.publisher}
            </div>
        ))}</>
    )
}

export default SearchPage;