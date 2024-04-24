export interface Comment {
  id: number;
  userUid: string;
  articleId: number;
  content: string;
  time: number;
  fatherId: number;
  father: Comment;
  like: number;
}
