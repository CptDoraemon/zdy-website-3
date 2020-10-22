import {Controller, Get, Post, Request, UseGuards, Body, Next, BadRequestException} from '@nestjs/common';
import {Request as ExpressRequest} from 'express';
import {AdminRegisterRequestDto} from "./dto/admin-register.dto";
import {AuthService} from "./auth.service";
import {LoginGuard} from "../common/guards/login.guard";
import {AuthenticatedGuard} from "../common/guards/authenticated.guard";

@Controller('auth')
export class AuthController {

  private adminRegisterTimeWindowStart = 0;
  private adminRegisterCallCount = 0;

  constructor(
    private authService: AuthService
  ) {}

  private passportLogin(user: any, request: ExpressRequest) {
    return new Promise((resolve, reject) => {
      request.login(user, (err) => {
        console.log(err);
        if (err) return reject(err);
        resolve(true)
      });
    })
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/ping')
  ping(@Request() request) {
    return {
      username: request.user.username,
      isAdmin: request.user.isAdmin
    }
  }

  @Post('/admin/register')
  async adminRegister(
    @Request() request,
    @Body() form: AdminRegisterRequestDto
  ) {
    // throttling
    const now = Date.now();
    const sinceTimeWindowStart = Math.round((now - this.adminRegisterTimeWindowStart) / 1000);
    const timeWindow = 60; // seconds
    const maxAttempts = 3;
    const isCalledRecently = sinceTimeWindowStart < timeWindow;
    this.adminRegisterCallCount++;
    if (isCalledRecently) {
      if (this.adminRegisterCallCount > maxAttempts) {
        const coolDown = timeWindow - sinceTimeWindowStart;
        throw new BadRequestException({message: `try again in ${coolDown} ${coolDown === 0 || coolDown === 1 ? 'second' : 'seconds'}`})
      }
    } else {
      this.adminRegisterTimeWindowStart = now;
      this.adminRegisterCallCount = 1;
    }

    const createdUser = await this.authService.registerAdmin(form.username, form.password, form.token);
    await this.passportLogin(createdUser, request);
    return {
      username: createdUser.username
    }
  }

  // @UseGuards(AdminLoginGuard)
  // @Post('/admin/login')
  // adminLogin(@Request() request) {
  //   return {username: request.user.username}
  // }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Request() request) {
    return {username: request.user.username}
  }

  @Post('/logout')
  async logout(@Request() request) {
    // get or post?
    // https://stackoverflow.com/questions/3521290/logout-get-or-post

    if (request.isAuthenticated()) {
      await request.logout()
    }
    return {status: 'ok'}
  }
}
