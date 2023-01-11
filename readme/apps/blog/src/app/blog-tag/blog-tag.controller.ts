import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { fillObject } from '@readme/core';
import { TagRdo } from './rdo/tag.rdo';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTag = await this.blogTagService.getTag(id);
    return fillObject(TagRdo, existTag);
  }

  @Get('/')
  async index() {
    const tags = await this.blogTagService.getTags();
    return fillObject(TagRdo, tags);
  }

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const newTag = await this.blogTagService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.blogTagService.deleteTag(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.blogTagService.updateTag(id, dto)
    return fillObject(TagRdo, updatedTag);
  }
}
