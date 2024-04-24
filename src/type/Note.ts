export interface Note {
  id: number;
  title: string;
  summary: string;
  authorUid: string;
  cover: string;
  content: string;
  createTime: number;
  updateTime: number;
  tags: string[];
  directory: string[];
  type: string;
  category: number[];

  commentNum: number;

  like: number;
  read: number;
  favorites: number;
}
