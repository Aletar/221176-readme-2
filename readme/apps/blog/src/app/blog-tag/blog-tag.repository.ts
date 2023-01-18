import { CRUDRepository } from '@readme/core';
import { BlogTagEntity } from './blog-tag.entity';
import { Tag } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogTagRepository implements CRUDRepository<BlogTagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tags.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tags.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Tag | null> {
    return this.prisma.tags.findFirst({
      where: {
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tags.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tags.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
