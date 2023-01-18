import { IsNumber, IsArray, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { DEFAULT_COMMENT_COUNT_LIMIT } from '../blog-comment.constant';

export class BlogCommentQuery {

  @Transform(({ value } ) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit: number = DEFAULT_COMMENT_COUNT_LIMIT;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public postId: number;

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsArray({})
  @IsOptional()
  public ids: number[] = [];

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

}
