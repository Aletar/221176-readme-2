import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CreateBlogCommentDto } from './dto/blog-comment-create.dto';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { BlogCommentQuery } from './query/blog-comment.query';

@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly commentService: BlogCommentService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const comment = await this.commentService.getComment(id);
    return fillObject(BlogCommentRdo, comment);
  }

  @Get('/')
  async index(@Query () query: BlogCommentQuery) {
    const comments = await this.commentService.getComments(query);
    return fillObject(BlogCommentRdo, comments);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The comment can not be created.'
  })
  async create(@Body() dto: CreateBlogCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(BlogCommentRdo, newComment);
  }

  @Delete('/:id/:userId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The comment can not be deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Param('userId') userId: string
  ) {
    const comment = await this.commentService.deleteComment(id, userId);
    return fillObject(BlogCommentRdo, comment);
  }
}
