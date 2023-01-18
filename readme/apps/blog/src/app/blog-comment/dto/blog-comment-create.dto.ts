import {ApiProperty} from '@nestjs/swagger';

export class CreateBlogCommentDto {

  @ApiProperty({
    description: 'Post id',
    example: '12345678'
  })
  public postId: number;

  @ApiProperty({
    description: 'Text',
    example: 'Something'
  })
  public text: string;

}
