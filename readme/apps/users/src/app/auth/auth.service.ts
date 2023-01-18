import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandEvent, User } from '@readme/shared-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { AUTH_USER_EXISTS, AUTH_USER_PASSWORD_WRONG, AUTH_USER_NOT_FOUND, RABBITMQ_SERVICE } from './auth.constant';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database.config';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,

    @Inject(databaseConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof databaseConfig>
  ) {}

  async register(dto: CreateUserDto) {
    const { email, name, password } = dto;
    const blogUser: User = {
      email,
      name,
      avatar: '',
      passwordHash: ''
    }

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    const createdUser = await this.blogUserRepository.create(userEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        name: createdUser.name,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;

  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(dto: ChangeUserPasswordDto) {
    const {email, password, newPassword} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    await blogUserEntity.setPassword(newPassword);

    return await this.blogUserRepository.update(blogUserEntity._id, blogUserEntity);
  }

  async updateById(userId: string, dto: User) {
    const blogUserEntity = new BlogUserEntity(dto);
    return await this.blogUserRepository.update(userId, blogUserEntity);
  }

  async getUserByEmail(email: string) {
    return await this.blogUserRepository.findByEmail(email);
  }
}
