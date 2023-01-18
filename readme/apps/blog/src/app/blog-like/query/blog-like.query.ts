import {IsNumber, IsArray, IsOptional} from 'class-validator';
import {Expose, Transform} from 'class-transformer';

export class BlogLikeQuery {

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit: number;

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
