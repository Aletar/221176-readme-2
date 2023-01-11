import { CRUDRepository } from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { Post } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostQuery } from './query/post.query';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        tags: {
          connect: [...entityData.tags]
        },
        comments: {
          connect: []
        }
      },
      include: {
        comments: true,
        tags: true,
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        id
      },
      include: {
        comments: true,
        tags: true,
      }
    });
  }

  public find({limit, categories, sortDirection, page}: PostQuery): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        tags: {
          some: {
            id: {
              in: tags
            }
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        tags: true
      },
      orderBy: [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject();
    return this.prisma.post.update({
      data: {
        ...entityData
      }
    });
  }
}
