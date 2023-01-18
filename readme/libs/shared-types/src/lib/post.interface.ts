import { Tag } from './tag.interface';
import { Comment } from './comment.interface';
import { Like } from './like.interface';

export interface Post {
  id?: number;
  type: string;
  createdAt?: Date;
  publishAt?: Date;
  userId: string;
  title?: string;
  announceText?: string;
  text?: string;
  quoteAuthor?: string;
  link?: string;
  photo?: BinaryData;
  published?: Date;
  tags?: Tag[];
  comments?: Comment[];
  likes?: Like[];
}
