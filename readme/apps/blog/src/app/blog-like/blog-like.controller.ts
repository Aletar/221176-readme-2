import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { BlogLikeRdo } from './rdo/blog-like.rdo';
import { BlogLikeQuery } from './query/blog-like.query';

@Controller('likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const like = await this.blogLikeService.getLike(id);
    return fillObject(BlogLikeRdo, like);
  }

  @Get('/')
  async index(@Query () query: BlogLikeQuery) {
    const likes = await this.blogLikeService.getLikes(query);
    return fillObject(BlogLikeRdo, likes);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new like has been successfully created.'
  })
  async create(@Body() dto: CreateBlogLikeDto) {
    const newLike = await this.blogLikeService.createLike(dto);
    return fillObject(BlogLikeRdo, newLike);
  }

  @Delete('/:id/:userId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The like has been successfully deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Param('userId') userId: string
  ) {
    const like = await this.blogLikeService.deleteLike(id, userId);
    return fillObject(BlogLikeRdo, like);
  }
}
