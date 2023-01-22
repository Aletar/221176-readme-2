import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@readme/shared-types';
import { BlogPostEntity } from './blog-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Injectable } from '@nestjs/common';
import { BlogTagRepository } from '../blog-tag/blog-tag.repository';
import { PostQuery } from './query/post.query';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post> {
    const tags = await this.blogTagRepository.find(dto.tags);
    const postEntity = new BlogPostEntity({ ...dto, tags, comments: [] });
    return this.blogPostRepository.create(postEntity);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} doesn't exist`);
    }
    this.blogPostRepository.destroy(id);
  }

  async getPost(id: number): Promise<Post> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} doesn't exist`);
    }
    return post;
  }

  async getPosts(query: PostQuery): Promise<Post[]> {
    return this.blogPostRepository.find(query)
  }

  async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} doesn't exist`);
    }
    const tags = await this.blogTagRepository.find(dto.tags);
    const postEntity = new BlogPostEntity({ ...dto, tags });
    return this.blogPostRepository.update(id, postEntity);
  }

}
