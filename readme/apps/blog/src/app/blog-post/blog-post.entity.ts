import { Tag, Post, Comment } from '@readme/shared-types';
import { Entity } from '@readme/core';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public id: number;
  public type: string;
  public createdAt: Date;
  public publishAt: Date;
  public userId: string;
  public tags: Tag[];
  public comments: Comment[];
  public title: string;
  public announceText: string;
  public text: string;
  public quoteAuthor: string;
  public link: string;
  public photo: BinaryData;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post): void {
    this.type = entity.type;
    this.createdAt = new Date();
    this.publishAt = new Date();
    this.userId = entity.userId;
    this.tags = [...entity.tags];
    this.comments = [];
    this.title = entity.title;
    this.announceText = entity.announceText;
    this.text = entity.text;
    this.quoteAuthor = entity.quoteAuthor;
    this.link = entity.link;
    this.photo = entity.photo;
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      tags: this.tags.map(({id}) => ({ id })),
      comments: this.comments.map(({id}) => ({id}))
    };
  }

}
