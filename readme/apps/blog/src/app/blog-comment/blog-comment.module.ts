import { Module } from '@nestjs/common';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogPostModule } from '../blog-post/blog-post.module';

@Module({
  imports: [
    BlogPostModule
  ],
  controllers: [BlogCommentController],
  providers: [BlogCommentService],
})
export class BlogCommentModule {}
