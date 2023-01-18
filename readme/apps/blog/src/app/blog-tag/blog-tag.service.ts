import { Tag } from '@readme/shared-types';
import { Injectable } from '@nestjs/common';
import { BlogTagRepository } from './blog-tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { BlogTagEntity } from './blog-tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const tagEntity = new BlogTagEntity(dto);
    return this.blogTagRepository.create(tagEntity);
  }

  async deleteTag(id: number): Promise<void> {
    this.blogTagRepository.destroy(id);
  }

  async getTag(id: number): Promise<Tag> {
    return this.blogTagRepository.findById(id);
  }

  async getTags(): Promise<Tag[]> {
    return this.blogTagRepository.find();
  }

  async updateTag(id: number, dto: UpdateTagDto): Promise<Tag> {
    return this.blogTagRepository.update(id, new BlogTagEntity(dto));
  }
}
