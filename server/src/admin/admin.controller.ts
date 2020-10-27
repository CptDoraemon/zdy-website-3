import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {UserService} from "../user/user.service";
import {AdminGuard} from "../common/guards/admin.guard";
import {AllUsersResponse} from "./dto/all-users-response.dto";

@Controller('admin')
export class AdminController {
  constructor(
    private userService: UserService
  ) {}

  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/all-users')
  async allUser(): Promise<AllUsersResponse> {
    const allUsers = await this.userService.getAllUsers();
    const response = new AllUsersResponse();
    response.users = allUsers;
    return response
  }

  @Post('/create-user')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body.username, body.password, false);
    return {
      username: user.username
    }
  }

  @Delete('/delete-user')
  async deleteUser(
    @Body() body: DeleteUserDto,
    @Request() req
  ) {
    const username = body.username;
    await this.userService.deleteUsers(username);

    // logout if this user is deleting itself
    if (username === req.user.username) {
      req.logOut()
    }

    return {
      status: 'ok'
    }
  }
}
