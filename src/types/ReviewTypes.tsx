export type ReviewParams = {
  reviewRating: number;
  isbn: string;
  bookInfo: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishedDate: string;
    image: string;
    description: string;
  };
};

export type LoginParams = {
  userId: string;
  password: string;
};