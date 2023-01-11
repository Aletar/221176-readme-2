import { Tag } from './tag.interface';
import { Comment } from './comment.interface';

export interface Post {
  id?: number;
  type: string;
  createdAt?: Date;
  publishAt?: Date;
  userId: string;
  tags?: Tag[];
  comments?: Comment[];
  title?: string;
  announceText?: string;
  text?: string;
  quoteAuthor?: string;
  link?: string;
  photo?: BinaryData;
}
