import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthReq } from '../auth/auth.guard';
import { Roles } from '../auth/roles.guard';
import {
  CreateUserDto,
  LoginResponse,
  LoginUserDto,
  UserResponse,
} from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<LoginResponse> {
    return await this.service.createUser(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<LoginResponse> {
    return await this.service.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req: AuthReq): Promise<UserResponse> {
    const user = await this.service.getUser(req.user.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('all')
  @Roles(['admin'])
  async getUsers(): Promise<UserResponse[] | undefined> {
    return await this.service.getUsers();
  }

  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<UserResponse | undefined> {
    return await this.service.getUser(username);
  }

  @Post(':username/accept')
  @Roles(['admin'])
  async acceptUser(@Param('username') username: string) {
    await this.service.acceptUser(username);
  }

  @Post(':username/decline')
  @Roles(['admin'])
  async declineUser(@Param('username') username: string) {
    await this.service.declineUser(username);
  }
}
