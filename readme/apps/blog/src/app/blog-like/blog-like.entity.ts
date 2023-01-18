import { Like } from '@readme/shared-types';
import { Entity } from '@readme/core';

export class BlogLikeEntity implements Entity<BlogLikeEntity>, Like {
  public id: number;
  public postId: number;
  public userId: string;

  constructor(Like: Like) {
    this.fillEntity(Like);
  }

  public fillEntity(entity: Like) {
    this.id = entity.id;
    this.postId = entity.postId;
    this.userId = entity.userId;
  }

  public toObject(): BlogLikeEntity {
    return { ...this }
  }
}
