import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class BlogCommentRdo {

  @ApiProperty({
    description: 'Comment ID',
    example: '1'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Post id',
    example: '1'
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'User id',
    example: '1'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Text',
    example: 'Something'
  })
  @Expose()
  public text: string;

}
