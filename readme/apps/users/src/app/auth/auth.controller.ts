import { Body, Controller, HttpCode, HttpStatus, Post, Get, Patch, UploadedFile, Param, UseGuards, Res, UseInterceptors } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto'
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '@readme/shared-types';
import * as mime from 'mime-types'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successful created'})
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.ACCEPTED,
    description: 'User has been successfully updated.'
  })
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: User) {
    const user = await this.authService.updateById(id, dto);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User password has been changed.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async changePassword(@Body() dto: ChangeUserPasswordDto) {
    const verifiedUser = await this.authService.changePassword(dto);
    return fillObject(UserRdo, verifiedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload',
      filename: (_req, file, callback) => {

        const extension = mime.extension(file.mimetype);
        const filename = nanoid();

        callback(null, `${filename}.${extension}`);
      }
    })
  }))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New avatar was uploaded.'
  })
  async avatar(@Param('id', MongoidValidationPipe) id: string, @UploadedFile() file) {
    const updatedUser = await this.authService.updateById(id, {avatar: file.filename} as User);
    return fillObject(UserRdo, updatedUser);
  }

  @Get('avatar/:imgpath')
  getAvatar(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }

}
