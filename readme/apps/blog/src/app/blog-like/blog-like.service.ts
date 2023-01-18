import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { Like } from '@readme/shared-types';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { BlogLikeQuery } from './query/blog-like.query';
import { LIKE_NOT_EXIST, LIKE_ALREADY_EXIST, POST_NOT_EXIST, POST_NOT_PUBLISHED, OTHER_OWNER } from './blog-like.constant';

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
      throw new HttpException(POST_NOT_EXIST, HttpStatus.FORBIDDEN);
    }
    if (post.published) {
      throw new HttpException(POST_NOT_PUBLISHED, HttpStatus.FORBIDDEN);
    }
    const query = new BlogLikeQuery;
    query.postId = postId;
    const likes = await this.blogLikeRepository.find(query);
    if (likes.length > 0) {
      throw new HttpException(LIKE_ALREADY_EXIST, HttpStatus.FORBIDDEN);
    }
    const likeEntity = new BlogLikeEntity(dto);
    return await this.blogLikeRepository.create(likeEntity);
  }

  async deleteLike(id: number, userId: string ) {
    const reaction = await this.blogLikeRepository.findById(id);
    if (!reaction) {
      throw new HttpException(LIKE_NOT_EXIST, HttpStatus.FORBIDDEN);
    }
    if (reaction.userId !== userId) {
      throw new HttpException(OTHER_OWNER, HttpStatus.FORBIDDEN);
    }
    return await this.blogLikeRepository.destroy(reaction.id);
  }
}
