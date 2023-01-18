import {ApiProperty} from '@nestjs/swagger';

export class CreateBlogLikeDto {
  @ApiProperty({
    description: 'Post ID',
    example: '12345678'
  })
  public postId: number;

  @ApiProperty({
    description: 'User ID',
    example: '12345678'
  })
  public userId: string;
}
