import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateAdmin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
