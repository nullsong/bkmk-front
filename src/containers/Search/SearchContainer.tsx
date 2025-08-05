import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@components";
import { books } from '@api/axiosAPI';
import useSearchStore from "store/useSearchStore";

const SearchContainer = () => {
  const { keyword } = useSearchStore();
  const [searchWord, setSearchWord] = useState("");
  const [bookList, setBookList] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = async () => {
    if (loading || isEnd) return;

    setLoading(true);
    try {
      const res = await books.getBooks({ keyword, start: pageRef.current });
      setTotal(res?.total);

      const resBooks = res?.bookList;

      if (bookList.length + resBooks.length >= res.total) {
        setIsEnd(true);
      }

      setBookList(bookList => [...bookList, ...resBooks]);
      pageRef.current += 10;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const attachObserver = useCallback((node: HTMLDivElement | null) => {
    if (loading || isEnd) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchBooks();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, isEnd]);

  useEffect(() => {
    const currentTarget = targetRef.current;
    if (currentTarget) {
      attachObserver(currentTarget);
    }

    return () => {
      if (observerRef.current && currentTarget) {
        observerRef.current.unobserve(currentTarget);
      }
    };
  }, [attachObserver]);

  useEffect(() => {
    setBookList([]);
    setIsEnd(false);
    pageRef.current = 1;

    if (searchWord.trim() !== "") {
      fetchBooks();
    }
  }, [searchWord]);

  return (
    <>
      <Search data={bookList} total={total} setSearchWord={setSearchWord} />
      <div ref={targetRef} style={{ height: 1 }} />
    </>
  );
};

export default SearchContainer;