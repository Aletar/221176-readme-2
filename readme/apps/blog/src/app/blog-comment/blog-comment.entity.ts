import { Comment } from '@readme/shared-types';
import { Entity } from '@readme/core';

export class BlogCommentEntity implements Entity<BlogCommentEntity>, Comment {
  public id: number;
  public createdAt: Date;
  public text: string;
  public postId: number;
  public userId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.id = entity.id;
    this.createdAt = new Date();
    this.text = entity.text;
    this.postId = entity.postId;
    this.userId = entity.userId;
  }

  public toObject(): BlogCommentEntity {
    return { ...this }
  }
}
