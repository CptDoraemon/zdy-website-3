import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {UserService} from "../user/user.service";

@Controller('admin')
export class AdminController {
  constructor(
    private userService: UserService
  ) {}

  @Get('/admin/all-users')
  async allUser() {
    const allUsers = await this.userService.getAllUsers();
    return {
      users: allUsers
    }
  }

  @Post('/admin/create-user')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body.username, body.password, false);
    return {
      username: user.username
    }
  }

  @Delete('/admin/delete-users')
  async deleteUser(@Body() body: DeleteUserDto) {
    await this.userService.deleteUsers(body.username);
    return {
      status: 'ok'
    }
  }
}
