import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentRepository } from './blog-comment.repository';
import { CreateBlogCommentDto } from './dto/blog-comment-create.dto';
import { Comment } from '@readme/shared-types';
import { BlogCommentQuery } from './query/blog-comment.query';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { POST_NOT_EXIST, POST_NOT_PUBLISHED, COMMENT_NOT_EXIST, OTHER_OWNER } from './blog-comment.constant';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getComment(id: number): Promise<Comment> {
    return await this.blogCommentRepository.findById(id);
  }

  async getComments(query: BlogCommentQuery): Promise<Comment[]> {
    return await this.blogCommentRepository.find(query);
  }

  async createComment(dto: CreateBlogCommentDto ) {
    const postId = +dto.postId;
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new HttpException(POST_NOT_EXIST, HttpStatus.FORBIDDEN);
    }
    if (!post.published) {
      throw new HttpException(POST_NOT_PUBLISHED, HttpStatus.FORBIDDEN);
    }
    const blogCommentEntity = new BlogCommentEntity(dto);
    return await this.blogCommentRepository.create(blogCommentEntity);
  }

  async deleteComment(id: number, userId: string  ) {
    const comment = await this.blogCommentRepository.findById(id);
    if (!comment) {
      throw new HttpException(COMMENT_NOT_EXIST, HttpStatus.FORBIDDEN);
    }
    if (comment.userId !== userId) {
      throw new HttpException(OTHER_OWNER, HttpStatus.FORBIDDEN);
    }
    return await this.blogCommentRepository.destroy(comment.id);
  }
}
