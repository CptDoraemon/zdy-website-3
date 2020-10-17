import {Controller, Get, Post, Request, Res, Render, UseGuards, Body} from '@nestjs/common';
import {AdminLoginGuard} from '../common/guards/adminLogin.guard';
import {AdminRegisterDto} from "./dto/admin-register.dto";
import {AuthService} from "./auth.service";
import {LoginGuard} from "../common/guards/login.guard";

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('/admin/register')
  async adminRegister(
    @Body() form: AdminRegisterDto,
  ) {
    return await this.authService.registerAdmin(form.username, form.password, form.token)
  }

  @UseGuards(AdminLoginGuard)
  @Post('/admin/login')
  adminLogin(@Request() request) {
    return {username: request.user.username}
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Request() request) {
    return {username: request.user.username}
  }
}
