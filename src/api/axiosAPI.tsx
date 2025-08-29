import { ModifyReviewParams, ReviewParams } from "types/ReviewTypes";
import axiosInstance from "./axiosInstance";

// =================================================================
//                          auth API
// =================================================================
export const auth = {
  /**
   * 로그인
   */
  postLogin: async (params: { userId: string, password: string }) => {
    const response = await axiosInstance.post('/auth/login', params);
    return response.data.token;
  }
};

// =================================================================
//                          books API
// =================================================================
export const books = {
  /**
   * 책 검색
   */
  getBooks: async (param: { keyword: string, start: number }) => {
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
  createMyReview: async (params: ReviewParams): Promise<any> => {
    const res = await axiosInstance.post('/review/', params);
    return res.data;
  },

  /**
   * 상세페이지 내리뷰 조회
   */
  getMyReview: async (params: { userId: string, isbn: number }) => {
    const response = await axiosInstance.get('/review/', { params });
    return response.data;
  },

  /**
   * 내 리뷰 조회 
   */
  getReviews: async (param: { userId: string }) => {
    const response = await axiosInstance.get('/review/list', { params: param });
    return response.data;
  },

  /**
   * 내 리뷰 수정
   */
  modifyMyReview: async (params: ModifyReviewParams): Promise<any> => {
    const res = await axiosInstance.put(`/review/${params.reviewId}`, params);
    return res.data;
  },

  /**
   * 내 리뷰 삭제
   */
  removeMyReview: async (params: { reviewId: string, userId: string }): Promise<any> => {
    const res = await axiosInstance.delete(`/review/${params.reviewId}`, {
      params: { userId: params.userId }
    });
    return res.data;
  },

  /**
   * 나의 별점 조회 
   */
  getMyRating: async (params: { userId: string }) => {
    const response = await axiosInstance.get('/review/rating', { params });
    return response.data;
  },
};
