import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "@components";
import { books } from '@api/axiosAPI';
import useSearchStore from "store/useSearchStore";

const SearchContainer = () => {
  const { state } = useLocation();
  const { data } = state;
  const { keyword } = useSearchStore();

  const [bookList, setBookList] = useState<any[]>(data.bookList);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(2);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = async () => {
    const start = (pageRef.current) * 10;
    if (loading || isEnd) return;
    setLoading(true);

    try {
      const res = await books.getBooks({ keyword, start });
      const resBooks = res?.bookList;

      if (resBooks.length < 10) {
        setIsEnd(true);
      }

      setBookList(prev => [...prev, ...resBooks]);
      pageRef.current += 1;

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
    if (targetRef.current) {
      attachObserver(targetRef.current);
    }
  }, [attachObserver, bookList]);

  return (
    <>
      <Search data={bookList} loading={loading} isEnd={isEnd} />
      <div ref={targetRef} style={{ height: 1 }} />
    </>
  );
};

export default SearchContainer;