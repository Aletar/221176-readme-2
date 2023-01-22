import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { Like } from '@readme/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { BlogLikeQuery } from './query/blog-like.query';
import { Message } from './blog-like.constant';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getLike(id: number): Promise<Like> {
    return await this.blogLikeRepository.findById(id);
  }

  async getLikes(query: BlogLikeQuery): Promise<Like[]> {
    return await this.blogLikeRepository.find(query);
  }

  async createLike(dto: CreateBlogLikeDto ) {
    const postId = +dto.postId;
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new NotFoundException(Message.PostNotExists);
    }
    if (post.published) {
      throw new BadRequestException(Message.PostNotPublished)
    }
    const query = new BlogLikeQuery;
    query.postId = postId;
    const likes = await this.blogLikeRepository.find(query);
    if (likes.length > 0) {
      throw new BadRequestException(Message.LikeAlreadyExist)
    }
    const likeEntity = new BlogLikeEntity(dto);
    return await this.blogLikeRepository.create(likeEntity);
  }

  async deleteLike(id: number, userId: string ) {
    const reaction = await this.blogLikeRepository.findById(id);
    if (!reaction) {
      throw new NotFoundException(Message.LikeNotExist)
    }
    if (reaction.userId !== userId) {
      throw new BadRequestException(Message.OtherOwner)
    }
    return await this.blogLikeRepository.destroy(reaction.id);
  }
}
