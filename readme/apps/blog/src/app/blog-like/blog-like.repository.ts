import { CRUDRepository } from '@readme/core';
import { BlogLikeEntity } from './blog-like.entity';
import { Like } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BlogLikeQuery } from './query/blog-like.query';

@Injectable()
export class BlogLikeRepository implements CRUDRepository<BlogLikeEntity, number, Like> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogLikeEntity): Promise<Like> {
    return this.prisma.likes.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.likes.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Like | null> {
    return this.prisma.likes.findFirst({
      where: {
        id
      }
    });
  }

  public find({limit, ids, postId, page}: | BlogLikeQuery ): Promise<Like[]> {
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

  public update(id: number, item: BlogLikeEntity): Promise<Like> {
    return this.prisma.likes.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
