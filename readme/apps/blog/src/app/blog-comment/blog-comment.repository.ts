import { CRUDRepository } from '@readme/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { Comment } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BlogCommentQuery } from './query/blog-comment.query';

@Injectable()
export class BlogCommentRepository implements CRUDRepository<BlogCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comments.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comments.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comments.findFirst({
      where: {
        id
      }
    });
  }

  public find({limit, ids, postId, page}: | BlogCommentQuery ): Promise<Comment[]> {
    return this.prisma.reaction.findMany({
      where: {
        postId: postId,
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comments.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
