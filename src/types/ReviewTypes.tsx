export type ReviewParams = {
  userId: string,
  reviewRating: number;
  isbn: string;
  reviewText: string,
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