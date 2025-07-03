import { ReviewParam } from "types/ReviewTypes";
import axiosInstance from "./axiosInstance";

// =================================================================
//                          books API
// =================================================================
export const books = {
  /**
   * 책 검색
   */
  getBooks: async (param: { keyword: string }) => {
    const response = await axiosInstance.get('/book/', { params: param });
    return response.data;
  },
  /**
   * 상세페이지 책 정보 조회
   */
  getBookInfo: async (param: { isbn: string }) => {
    const response = await axiosInstance.get('/book/info', { params: param });
    return response.data;
  },
};

// =================================================================
//                          reviews API
// =================================================================
export const reviews = {
  /**
   * 내 리뷰 저장
   */
  createMyReview: async (param: ReviewParam): Promise<any> => {
    const res = await axiosInstance.post('/review/', param);
    return res.data;
  },

  /**
   * 상세페이지 내리뷰 조회
   */
  getMyReview: async (param: { userId: string, bookSrno: number }) => {
    const response = await axiosInstance.get('/review/', { params: param });
    return response.data;
  },

  /**
   * 내 리뷰 조회 
   */
  getReviews: async (param: { userId: string }) => {
    const response = await axiosInstance.get('/review/list', { params: param });
    return response.data;
  },
};

