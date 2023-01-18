import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';
import { BlogPostModule } from '../blog-post/blog-post.module';

@Module({
  imports: [
    BlogPostModule,
  ],
  providers: [BlogLikeService],
  controllers: [BlogLikeController],
})
export class LikeModule {}
