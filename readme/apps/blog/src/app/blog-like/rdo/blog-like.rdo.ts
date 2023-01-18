import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class BlogLikeRdo {
  @ApiProperty({
    description: 'Like ID',
    example: '1'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Post id',
    example: '12345678'
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'UserId',
    example: 'id12345678'
  })
  @Expose()
  public userId: string;
}
