import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {CONNECTION} from "../main";

@Injectable()
export class UserService {

  private static getTimeStamp() {
    return new Date().toISOString();
  };

  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({where: {username}})
  }

  async updateLastLogin (user: UserEntity) {
    user.lastLogin = UserService.getTimeStamp();
    await this.repository.save(user);
  };

  async createUser(username: string, password: string, isAdmin: boolean) {
    // check if user exists
    const user = await this.findOne(username);
    if (user) throw new BadRequestException('user exists');

    // create user
    const newUser = new UserEntity();
    const now = UserService.getTimeStamp();
    newUser.password = await bcrypt.hash(password, 10);
    newUser.username = username;
    newUser.isAdmin = isAdmin;
    newUser.created = now;
    newUser.lastLogin = now;
    return await this.repository.save(newUser);
  }

  async getAllUsers() {
    return await this.repository.find();
  }

  async deleteUsers(username: string) {
    // check if user exists
    const user = await this.findOne(username);
    if (!user) throw new BadRequestException('no such user');

    // delete user
    await this.repository.delete(user);

    // query helper
    const query = (queryString) => {
      return new Promise((resolve, reject) => {
        CONNECTION.query(queryString, (err) => {
          if (err) return reject(err);
          resolve(true)
        })
      })
    };

    // clear user's session
    const sessionTable = this.configService.get('SESSION_TABLE');
    const userId = user.id;
    await query(`DELETE FROM ${sessionTable} WHERE data REGEXP \'"passport":\\\\{"user":\\\\{"id":${userId},\';`);

    return true
  }
}
