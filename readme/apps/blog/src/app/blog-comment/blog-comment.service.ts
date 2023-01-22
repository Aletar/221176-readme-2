import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentRepository } from './blog-comment.repository';
import { CreateBlogCommentDto } from './dto/blog-comment-create.dto';
import { Comment } from '@readme/shared-types';
import { BlogCommentQuery } from './query/blog-comment.query';
import { BlogPostRepository } from '../blog-post/blog-post.repository';
import { Message } from './blog-comment.constant';

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
      throw new NotFoundException(Message.PostNotExists);
    }
    if (!post.published) {
      throw new BadRequestException(Message.PostNotPublished);
    }
    const blogCommentEntity = new BlogCommentEntity(dto);
    return await this.blogCommentRepository.create(blogCommentEntity);
  }

  async deleteComment(id: number, userId: string  ) {
    const comment = await this.blogCommentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(Message.CommentNotExist)
    }
    if (comment.userId !== userId) {
      throw new BadRequestException(Message.OtherOwner);
    }
    return await this.blogCommentRepository.destroy(comment.id);
  }
}
