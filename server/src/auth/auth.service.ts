import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        await this.userService.updateLastLogin(user);
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async validateAdmin(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.isAdmin) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        await this.userService.updateLastLogin(user);
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async registerAdmin(username: string, password: string, token: string): Promise<any> {
    // verify token
    const isTokenValid = token === this.configService.get<string>('ADMIN_TOKEN');
    if (!isTokenValid) throw new ForbiddenException({message: 'not authorized'});

    // create admin
    return await this.userService.createUser(username, password, true);
  }
}
